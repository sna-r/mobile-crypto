// components/Wallet.tsx
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  useColorScheme,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { UserContext } from '@/app/_layout';

export default function Wallet() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Couleurs selon le thème
  const backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
  const primaryTextColor = isDarkMode ? '#e5e7eb' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#a1a1aa' : '#6b7280';
  const accentColor = isDarkMode ? '#ffd33d' : '#007bff';
  const cardBackgroundColor = isDarkMode ? '#25292e' : '#f9fafb';

  const [balance, setBalance] = useState<number>(0);
  const [cryptoTransactions, setCryptoTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Récupère l'utilisateur via le contexte
  const user = useContext(UserContext);

  // Fonction de récupération des données
  const fetchData = async () => {
    try {
      // 1. Récupérer les transactions de fonds validées pour calculer le solde
      const fundQuery = query(
        collection(db, "fundTransactions"),
        where("userId", "==", user?.id),
        where("status", "==", "VALIDATE")
      );
      const fundSnapshot = await getDocs(fundQuery);
      let total = 0;
      fundSnapshot.forEach(doc => {
        const data = doc.data();
        const amt = parseFloat(data.amount);
        // transactionTypeId 1 = dépôt, 2 = retrait
        if (data.transactionTypeId === 1) {
          total += amt;
        } else if (data.transactionTypeId === 2) {
          total -= amt;
        }
      });
      setBalance(total);

      // 2. Récupérer l'historique des transactions crypto de l'utilisateur
      const cryptoQuery = query(
        collection(db, "cryptoTransactions"),
        where("userId", "==", Number(user?.id)),
        orderBy("transactionDate", "desc")
      );
      const cryptoSnapshot = await getDocs(cryptoQuery);
      const transactions: any[] = [];
      cryptoSnapshot.forEach(doc => {
        transactions.push({ id: doc.id, ...doc.data() });
      });

      // 3. Extraire les cryptoIds uniques présents dans les transactions
      const uniqueCryptoIds = Array.from(new Set(transactions.map(tx => tx.cryptoId)));

      if (uniqueCryptoIds.length > 0) {
        // Récupérer les détails (nom) de chaque crypto depuis la collection "cryptos"
        const cryptoCatalogQuery = query(
          collection(db, "cryptos"),
          where("id", "in", uniqueCryptoIds)
        );
        const catalogSnapshot = await getDocs(cryptoCatalogQuery);
        const cryptoMapping: { [key: number]: string } = {};
        catalogSnapshot.forEach(doc => {
          const data = doc.data();
          cryptoMapping[data.id] = data.name;
        });
        // Enrichir chaque transaction avec le nom de la crypto
        const enrichedTransactions = transactions.map(tx => ({
          ...tx,
          cryptoName: cryptoMapping[tx.cryptoId] || `Crypto ${tx.cryptoId}`
        }));
        setCryptoTransactions(enrichedTransactions);
      } else {
        setCryptoTransactions(transactions);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  // Appel initial de fetchData lors de la disponibilité de l'utilisateur
  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Fonction de rafraîchissement des donnees
  const refreshData = async () => {
    setLoading(true);
    if (user) {
      await fetchData();
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={{ color: primaryTextColor }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Section Solde Principal */}
      <View style={styles.mainBalanceContainer}>
        <Text style={[styles.mainBalanceTitle, { color: primaryTextColor }]}>Votre solde</Text>
        <Text style={[styles.mainBalanceAmount, { color: accentColor }]}>
          ${balance.toFixed(2)}
        </Text>
        <Text style={[styles.mainBalanceSubtitle, { color: secondaryTextColor }]}>Aujourd'hui</Text>

        {/* Bouton de rafraîchissement */}
        <TouchableOpacity style={styles.refreshButton} onPress={refreshData}>
          <Ionicons name="refresh" size={24} color={accentColor} />
          <Text style={[styles.refreshText, { color: primaryTextColor }]}>Rafraîchir</Text>
        </TouchableOpacity>
      </View>

      {/* Section Historique des Transactions Crypto */}
      <View style={styles.cryptoBalancesContainer}>
        <Text style={[styles.sectionTitle, { color: primaryTextColor }]}>
          Historique des transactions crypto
        </Text>
        <FlatList
          data={cryptoTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            // Déterminer le type d'opération
            const transactionType =
              item.transactionTypeId === 3 ? "ACHAT" :
                item.transactionTypeId === 4 ? "VENTE" : "";
            // Formater la date avec date et heure lisibles
            const dateTime = new Date(item.transactionDate).toLocaleString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
            return (
              <View style={[styles.cryptoItem, { backgroundColor: cardBackgroundColor }]}>
                {/* Icône par défaut pour crypto */}
                <Ionicons name="logo-bitcoin" size={30} color={accentColor} style={{ marginRight: 10 }} />
                <View style={styles.cryptoDetails}>
                  <Text style={[styles.cryptoName, { color: primaryTextColor }]}>
                    {item.transactionTypeId === 3 ? 'ACHAT de' : 'VENTE de'} {item.cryptoName}
                  </Text>
                  <Text style={[styles.cryptoBalance, { color: secondaryTextColor }]}>
                    Prix unitaire: ${parseFloat(item.priceUnit).toFixed(2)}
                  </Text>
                  <Text style={[styles.cryptoBalance, { color: secondaryTextColor }]}>
                    Quantité: {item.quantity}
                  </Text>
                  <Text style={[styles.cryptoBalance, { color: secondaryTextColor }]}>
                    Total: ${parseFloat(item.totalAmount).toFixed(2)}
                  </Text>
                  <Text style={[styles.cryptoBalance, { color: secondaryTextColor }]}>
                    Date: {dateTime}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    padding: 8,
  },
  refreshText: {
    fontSize: 16,
    marginLeft: 5,
  },
  mainBalanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: screenHeight * 0.1,
  },
  mainBalanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mainBalanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  mainBalanceSubtitle: {
    fontSize: 14,
  },
  cryptoBalancesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  cryptoDetails: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cryptoBalance: {
    fontSize: 14,
  },
});
