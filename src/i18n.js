import React, { createContext, useContext, useState } from "react";

/*
 Language + currency provider used across pages.
*/

const translations = {
  English: {
    welcome: "Welcome",
    account: "Account No",
    currency: "Currency",
    balance: "Balance",
    recent: "Recent Transactions",
    transfer: "Transfer Money",
    recipient: "Recipient Account",
    amount: "Amount",
    send: "Send",
    spending: "Spending Overview",
    logout: "Logout",
    overview: "Account Overview",
    quick: "Quick Actions",
    manage: "Manage Profile",
    fixed: "Open Fixed Deposit",
    view: "View Statements",
    menuDashboard: "Dashboard",
    menuTransactions: "Transactions",
    menuTransfer: "Transfer",
    menuSettings: "Settings",
    landingTitle: "Empowering Your Financial Future",
    login: "Login",
    register: "Register",
  },
  Hindi: {
    welcome: "स्वागत है",
    account: "खाता संख्या",
    currency: "मुद्रा",
    balance: "बैलेंस",
    recent: "हाल की लेन-देन",
    transfer: "पैसे भेजें",
    recipient: "प्राप्तकर्ता खाता",
    amount: "राशि",
    send: "भेजें",
    spending: "खर्च का अवलोकन",
    logout: "लॉगआउट",
    overview: "खाता अवलोकन",
    quick: "त्वरित क्रियाएँ",
    manage: "प्रोफ़ाइल प्रबंधित करें",
    fixed: "नियत जमा खोलें",
    view: "विवरण देखें",
    menuDashboard: "डैशबोर्ड",
    menuTransactions: "लेन-देन",
    menuTransfer: "स्थानांतरण",
    menuSettings: "सेटिंग्स",
    landingTitle: "आपके वित्तीय भविष्य को सशक्त बनाना",
    login: "लॉगिन",
    register: "रजिस्टर",
  },
  Japanese: {
    welcome: "ようこそ",
    account: "口座番号",
    currency: "通貨",
    balance: "残高",
    recent: "最近の取引",
    transfer: "送金",
    recipient: "受取人口座",
    amount: "金額",
    send: "送信",
    spending: "支出概要",
    logout: "ログアウト",
    overview: "口座概要",
    quick: "クイックアクション",
    manage: "プロフィールを管理",
    fixed: "定期預金を開設",
    view: "取引明細を見る",
    menuDashboard: "ダッシュボード",
    menuTransactions: "取引",
    menuTransfer: "送金",
    menuSettings: "設定",
    landingTitle: "あなたの金融の未来を強化する",
    login: "ログイン",
    register: "登録",
  },
  French: {
    welcome: "Bienvenue",
    account: "Numéro de compte",
    currency: "Devise",
    balance: "Solde",
    recent: "Transactions récentes",
    transfer: "Transférer de l'argent",
    recipient: "Compte du bénéficiaire",
    amount: "Montant",
    send: "Envoyer",
    spending: "Aperçu des dépenses",
    logout: "Se déconnecter",
    overview: "Aperçu du compte",
    quick: "Actions rapides",
    manage: "Gérer le profil",
    fixed: "Ouvrir un dépôt à terme",
    view: "Voir les relevés",
    menuDashboard: "Tableau de bord",
    menuTransactions: "Transactions",
    menuTransfer: "Transfert",
    menuSettings: "Paramètres",
    landingTitle: "Renforcer votre avenir financier",
    login: "Connexion",
    register: "S'inscrire",
  },
  Chinese: {
    welcome: "欢迎",
    account: "账号",
    currency: "货币",
    balance: "余额",
    recent: "最近交易",
    transfer: "转账",
    recipient: "收款账户",
    amount: "金额",
    send: "发送",
    spending: "支出概览",
    logout: "登出",
    overview: "账户概览",
    quick: "快捷操作",
    manage: "管理资料",
    fixed: "开立定期存款",
    view: "查看对账单",
    menuDashboard: "仪表板",
    menuTransactions: "交易记录",
    menuTransfer: "转账",
    menuSettings: "设置",
    landingTitle: "增强您的金融未来",
    login: "登录",
    register: "注册",
  },
};

const exchangeRates = { INR: 1, JPY: 1.7, KWD: 0.0036 };

const ctx = createContext();

export function LangCurrencyProvider({ children }) {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR");
  return (
    <ctx.Provider value={{ language, setLanguage, currency, setCurrency, t: translations[language], exchangeRates }}>
      {children}
    </ctx.Provider>
  );
}

export function useLang() {
  return useContext(ctx);
}
