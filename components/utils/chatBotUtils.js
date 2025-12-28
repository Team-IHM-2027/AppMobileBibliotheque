// utils/chatbotUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Système de cache pour les réponses fréquentes
export class ChatBotCache {
    static CACHE_KEY = 'chatbot_responses_cache';
    static CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 heures

    // Sauvegarder une réponse en cache
    static async saveResponse(question, response) {
        try {
            const cache = await this.getCache();
            const normalizedQuestion = this.normalizeQuestion(question);

            cache[normalizedQuestion] = {
                response,
                timestamp: Date.now(),
            };

            await AsyncStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
        } catch (error) {
            console.error('Erreur sauvegarde cache:', error);
        }
    }

    // Récupérer une réponse du cache
    static async getCachedResponse(question) {
        try {
            const cache = await this.getCache();
            const normalizedQuestion = this.normalizeQuestion(question);
            const cached = cache[normalizedQuestion];

            if (cached && (Date.now() - cached.timestamp) < this.CACHE_EXPIRY) {
                return cached.response;
            }

            return null;
        } catch (error) {
            console.error('Erreur lecture cache:', error);
            return null;
        }
    }

    // Nettoyer le cache expiré
    static async cleanExpiredCache() {
        try {
            const cache = await this.getCache();
            const now = Date.now();
            const cleanedCache = {};

            Object.keys(cache).forEach(key => {
                if ((now - cache[key].timestamp) < this.CACHE_EXPIRY) {
                    cleanedCache[key] = cache[key];
                }
            });

            await AsyncStorage.setItem(this.CACHE_KEY, JSON.stringify(cleanedCache));
        } catch (error) {
            console.error('Erreur nettoyage cache:', error);
        }
    }

    // Récupérer tout le cache
    static async getCache() {
        try {
            const cached = await AsyncStorage.getItem(this.CACHE_KEY);
            return cached ? JSON.parse(cached) : {};
        } catch (error) {
            console.error('Erreur récupération cache:', error);
            return {};
        }
    }

    // Normaliser la question pour la comparaison
    static normalizeQuestion(question) {
        return question
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, '') // Enlever la ponctuation
            .replace(/\s+/g, ' '); // Normaliser les espaces
    }
}

// Réponses de fallback prédéfinies
export const FALLBACK_RESPONSES = {
    emprunt: {
        keywords: ['emprunter', 'emprunt', 'prêt', 'réserver', 'réservation'],
        response: "Pour emprunter un livre, recherchez-le dans l'application et cliquez sur 'Réserver'. Vous pourrez ensuite le récupérer à la bibliothèque. La durée d'emprunt standard est de 2 semaines."
    },
    horaires: {
        keywords: ['horaire', 'heure', 'ouvert', 'fermé', 'ouverture'],
        response: "Pour connaître les horaires d'ouverture actuels de la bibliothèque, je vous invite à contacter directement la bibliothécaire qui vous donnera les informations les plus récentes."
    },
    recherche: {
        keywords: ['chercher', 'recherche', 'trouver', 'livre', 'document'],
        response: "Vous pouvez rechercher des livres directement dans l'application en utilisant la barre de recherche. Filtrez par catégorie (Génie Électrique, Informatique, Mécanique, Télécommunications) pour des résultats plus précis."
    },
    prolongation: {
        keywords: ['prolonger', 'prolongation', 'renouveler', 'retard'],
        response: "Pour prolonger un emprunt, contactez la bibliothécaire via cette messagerie. Les prolongations sont généralement possibles si le livre n'est pas réservé par un autre étudiant."
    },
    aide: {
        keywords: ['aide', 'problème', 'support', 'assistance'],
        response: "Je suis là pour vous aider ! Pour des questions spécifiques ou complexes, n'hésitez pas à écrire un message détaillé. La bibliothécaire pourra vous apporter une aide personnalisée."
    },
    default: "Merci pour votre question. La bibliothécaire vous répondra dans les plus brefs délais pour vous apporter l'aide la plus adaptée à votre situation."
};

// Détecteur d'intention simple
export class IntentDetector {
    static detectIntent(message) {
        const normalizedMessage = message.toLowerCase();

        for (const [intent, config] of Object.entries(FALLBACK_RESPONSES)) {
            if (intent === 'default') continue;

            const hasKeyword = config.keywords.some(keyword =>
                normalizedMessage.includes(keyword)
            );

            if (hasKeyword) {
                return intent;
            }
        }

        return 'default';
    }

    static getFallbackResponse(message) {
        const intent = this.detectIntent(message);
        return FALLBACK_RESPONSES[intent]?.response || FALLBACK_RESPONSES.default;
    }
}

// Système de retry avec backoff exponentiel
export class RetryHandler {
    static async executeWithRetry(apiCall, maxRetries = 3) {
        let lastError;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                return await apiCall();
            } catch (error) {
                lastError = error;

                if (attempt < maxRetries - 1) {
                    const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
                    await this.delay(delay);
                }
            }
        }

        throw lastError;
    }

    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Configuration et monitoring des performances
export class ChatBotMonitor {
    static responseTimeThreshold = 5000; // 5 secondes

    static async measureResponseTime(apiCall) {
        const startTime = Date.now();

        try {
            const result = await apiCall();
            const responseTime = Date.now() - startTime;

            this.logMetrics('success', responseTime);
            return result;
        } catch (error) {
            const responseTime = Date.now() - startTime;
            this.logMetrics('error', responseTime, error);
            throw error;
        }
    }

    static logMetrics(status, responseTime, error = null) {
        const metrics = {
            timestamp: new Date().toISOString(),
            status,
            responseTime,
            isSlowResponse: responseTime > this.responseTimeThreshold,
            error: error?.message
        };

        // En production, vous pourriez envoyer ces métriques à un service d'analytics
        console.log('[chatBot Metrics]', metrics);

        // Sauvegarder localement pour debug
        this.saveLocalMetrics(metrics);
    }

    static async saveLocalMetrics(metrics) {
        try {
            const existingMetrics = await AsyncStorage.getItem('chatbot_metrics');
            const metricsArray = existingMetrics ? JSON.parse(existingMetrics) : [];

            metricsArray.push(metrics);

            // Garder seulement les 100 dernières métriques
            if (metricsArray.length > 100) {
                metricsArray.splice(0, metricsArray.length - 100);
            }

            await AsyncStorage.setItem('chatbot_metrics', JSON.stringify(metricsArray));
        } catch (error) {
            console.error('Erreur sauvegarde métriques:', error);
        }
    }
}

// Service de configuration du chatbot
export class ChatBotConfig {
    static defaultConfig = {
        enableCache: true,
        enableFallback: true,
        maxRetries: 3,
        responseTimeout: 10000,
        enableMetrics: true,
        cacheExpiry: 24 * 60 * 60 * 1000, // 24h
    };

    static async getConfig() {
        try {
            const saved = await AsyncStorage.getItem('chatbot_config');
            return saved ? { ...this.defaultConfig, ...JSON.parse(saved) } : this.defaultConfig;
        } catch (error) {
            console.error('Erreur lecture config:', error);
            return this.defaultConfig;
        }
    }

    static async updateConfig(newConfig) {
        try {
            const current = await this.getConfig();
            const updated = { ...current, ...newConfig };
            await AsyncStorage.setItem('chatbot_config', JSON.stringify(updated));
            return updated;
        } catch (error) {
            console.error('Erreur mise à jour config:', error);
            return this.defaultConfig;
        }
    }
}

// Utilitaire principal pour l'appel API avec toutes les optimisations
export class ChatBotAPI {
    static async callGeminiWithOptimizations(prompt, geminiRunFunction) {
        const config = await ChatBotConfig.getConfig();

        // 1. Vérifier le cache si activé
        if (config.enableCache) {
            const cached = await ChatBotCache.getCachedResponse(prompt);
            if (cached) {
                return cached;
            }
        }

        // 2. Appel API avec retry et monitoring
        try {
            const response = await ChatBotMonitor.measureResponseTime(async () => {
                return await RetryHandler.executeWithRetry(
                    () => geminiRunFunction(prompt),
                    config.maxRetries
                );
            });

            // 3. Sauvegarder en cache si activé
            if (config.enableCache) {
                await ChatBotCache.saveResponse(prompt, response);
            }

            return response;

        } catch (error) {
            console.error('Erreur API Gemini:', error);

            // 4. Fallback si activé
            if (config.enableFallback) {
                return IntentDetector.getFallbackResponse(prompt);
            }

            throw error;
        }
    }
}

export default {
    ChatBotCache,
    FALLBACK_RESPONSES,
    IntentDetector,
    RetryHandler,
    ChatBotMonitor,
    ChatBotConfig,
    ChatBotAPI
};