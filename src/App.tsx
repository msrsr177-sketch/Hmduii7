/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Smartphone, 
  Zap, 
  Cable, 
  Plug2, 
  Search, 
  LayoutDashboard, 
  Package, 
  History, 
  Settings,
  Wrench,
  UserCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Battery,
  Hammer,
  Headphones,
  Camera,
  CreditCard,
  Fingerprint,
  Radio,
  Cpu,
  CircuitBoard,
  Folder,
  ChevronLeft,
  Plus,
  FolderPlus,
  FilePlus,
  X,
  Folders,
  ArrowUpRight,
  Bell,
  LogOut,
  ChevronDown,
  Printer,
  Bluetooth,
  UserPlus,
  Repeat,
  Trash2
} from "lucide-react";
import React, { useState, useMemo, FormEvent, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Language = 'ar' | 'en';

const translations = {
  ar: {
    title: "فـون فيِكس",
    searchPlaceholder: "ابحث عن قطعة (شاشة، فلات، كونكتر)...",
    totalItems: "إجمالي القطع",
    itemTypes: "أنواع القطع",
    withdrawals: "عمليات سحب",
    recentActivity: "آخر العمليات",
    activity_withdraw: "سحب",
    activity_add: "إضافة",
    maintenanceStatus: "حالة الصيانة",
    mainCategories: "الأقسام الرئيسية",
    piece: "قطعة",
    backToFolders: "العودة للمجلدات",
    backToCategories: "العودة للأقسام",
    chooseCompany: "اختر الشركة أو أضف منتجاً",
    addFolder: "إضافة مجلد",
    addProduct: "إضافة منتج جديد",
    addCustomer: "إضافة بطاقة زبون",
    inventory: "المخزن العام",
    maintenance: "بطاقات الزبائن",
    activeCustomers: "إجمالي النشطين",
    withdrawPiece: "سحب قطعة",
    quantity: "الكمية",
    emptyInventory: "المخزن فارغ",
    emptyInventoryDesc: "لا توجد أي قطع مضافة في المخزن حاليا. استخدم زر (+) لإضافة أول قطعة.",
    customerName: "اسم الزبون",
    deviceType: "نوع الجهاز",
    cost: "التكلفة",
    issue: "المشكلة / العطل",
    save: "حفظ",
    cancel: "إلغاء",
    ready: "جاهز",
    inProgress: "قيد العمل",
    entryDate: "دخول",
    readyDate: "اكتمال",
    readyToDeliver: "جاهز للتسليم",
    underMaintenance: "قيد الصيانة",
    all: "الكل",
    pending: "قيد العمل",
    filterReady: "القطع الجاهزة",
    editData: "تعديل البيانات",
    noRecords: "لا توجد بطاقات صيانة حالياً",
    noRecordsDesc: "ابدأ بإضافة أول زبون من خلال زر \"إضافة بطاقة\" أعلاه.",
    location: "الموقع",
    brand: "الماركة / النوع",
    productName: "اسم القطعة / المنتج",
    folderName: "اسم المجلد",
    category: "القسم",
    enterDetails: "أدخل البيانات المطلوبة أدناه",
    placeholderProduct: "مثال: شاشة iPhone 13 Pro Max",
    placeholderFolder: "مثال: موديلات سامسونج 2024",
    placeholderCustomer: "أدخل اسم الزبون الكامل",
    placeholderCost: "أدخل المبلغ المقدر",
    placeholderIssue: "صف العطل بالتفصيل...",
    placeholderLoc: "مثال: رف A1",
    placeholderBrand: "مثال: Apple",
    placeholderQty: "0",
    placeholderDevice: "مثال: iPhone 14 Pro",
    screens: "شاشات",
    batteries: "البطاريات",
    chargingFlex: "فلات شحن",
    disassembled: "أجهزة تفصيخ",
    speakers: "سبيكر",
    cameras: "كاميرات",
    sim: "شرايح",
    powerFinger: "بصمة + زر باور",
    antennas: "هوائيات",
    cpu: "معالج",
    motherboard: "مذربورد",
    connectors: "كونكتر",
    chargingBase: "قاعدة شحن",
    others: "شركات أخرى",
    tecno: "تكنو",
    iphone: "ايفون",
    samsung: "سامسونج",
    xiaomi: "شاومي",
    huawei: "هواوي",
    infinix: "انفنكس",
    loginTitle: "تسجيل الدخول",
    loginDesc: "اختر طريقة الدخول للبدء",
    googleLogin: "تسجيل الدخول بجوجل",
    guestLogin: "دخول كضيف",
    adminAccess: "دخول المسؤول",
    enterCode: "أدخل كود الوصول السري",
    incorrectCode: "كود خاطئ!",
    loginAsAdmin: "تسجيل الدخول بصفة مسؤول",
    notifications: "الإشعارات",
    activityLog: "سجل النشاطات",
    noNotifications: "لا توجد إشعارات جديدة",
    notificationAdded: "تمت إضافة قطعة:",
    notificationWithdrawn: "تم سحب قطعة:",
    notificationWithdrawLimit: "تنبيه: مخزون منخفض!",
    print: "طباعة البطاقة",
    saveAndPrint: "حفظ وطباعة",
    bluetoothError: "عذراً، متصفحك لا يدعم البلوتوث أو فشل الاتصال",
    searchingBluetooth: "جاري البحث عن طابعة بلوتوث...",
    connecting: "جاري الاتصال...",
    printSuccess: "تم إرسال البيانات للطابعة بنجاح",
    prices: "الأسعار",
    addPrice: "إضافة سعر جديد",
    priceType: "نوع القطعة",
    priceValue: "السعر بالدينار",
    iqd: "د.ع",
    compatibility: "التوافق",
    addCompatibility: "إضافة توافق جديد",
    deviceName: "اسم الجهاز",
    compatibleDevices: "الأجهزة المتوافقة (افصل بينها بسطر جديد)",
    compatibilityList: "قائمة التوافق",
    brandType: "الماركة / النوع",
    compatibilityResults: "نتائج التوافق",
    miscellaneous: "المنوعات",
    trackCount: "عدد المسارات",
    logout: "تسجيل الخروج",
    productPrice: "سعر القطعة",
    productImage: "رابط الصورة (اختياري)",
    viewImage: "عرض الصورة",
  },
  en: {
    title: "New Phone",
    searchPlaceholder: "Search for a part (screen, flex, connector)...",
    totalItems: "Total Items",
    itemTypes: "Item Types",
    withdrawals: "Withdrawals",
    recentActivity: "Recent Activity",
    activity_withdraw: "Withdrawn",
    activity_add: "Added",
    maintenanceStatus: "Maintenance Status",
    mainCategories: "Main Categories",
    piece: "piece",
    backToFolders: "Back to Folders",
    backToCategories: "Back to Categories",
    chooseCompany: "Choose Company or Add Product",
    addFolder: "Add Folder",
    addProduct: "Add New Product",
    addCustomer: "Add Customer Card",
    inventory: "General Stock",
    maintenance: "Customer Cards",
    activeCustomers: "Total Active",
    withdrawPiece: "Withdraw Piece",
    quantity: "Quantity",
    emptyInventory: "Stock is Empty",
    emptyInventoryDesc: "No items added to stock yet. Use the (+) button to add your first piece.",
    customerName: "Customer Name",
    deviceType: "Device Type",
    cost: "Cost",
    issue: "Issue / Fault",
    save: "Save",
    cancel: "Cancel",
    ready: "Ready",
    inProgress: "In Progress",
    entryDate: "Entry",
    readyDate: "Ready",
    readyToDeliver: "Ready to Deliver",
    underMaintenance: "Under Maintenance",
    all: "All",
    pending: "In Progress",
    filterReady: "Ready Parts",
    editData: "Edit Data",
    noRecords: "No maintenance cards available",
    noRecordsDesc: "Start by adding your first customer using the \"Add Card\" button above.",
    location: "Location",
    brand: "Brand / Type",
    productName: "Part / Product Name",
    folderName: "Folder Name",
    category: "Category",
    enterDetails: "Enter the required details below",
    placeholderProduct: "Ex: iPhone 13 Pro Max Screen",
    placeholderFolder: "Ex: Samsung 2024 Models",
    placeholderCustomer: "Enter full customer name",
    placeholderCost: "Enter estimated amount",
    placeholderIssue: "Describe the fault in detail...",
    placeholderLoc: "Ex: Shelf A1",
    placeholderBrand: "Ex: Apple",
    placeholderQty: "0",
    placeholderDevice: "Ex: iPhone 14 Pro",
    screens: "Screens",
    batteries: "Batteries",
    chargingFlex: "Charging Flex",
    disassembled: "Disassembled Devices",
    speakers: "Speakers",
    cameras: "Cameras",
    sim: "SIM Cards",
    powerFinger: "Fingerprint + Power",
    antennas: "Antennas",
    cpu: "CPU",
    motherboard: "Motherboard",
    connectors: "Connectors",
    chargingBase: "Charging Base",
    others: "Other Companies",
    tecno: "Tecno",
    iphone: "iPhone",
    samsung: "Samsung",
    xiaomi: "Xiaomi",
    huawei: "Huawei",
    infinix: "Infinix",
    loginTitle: "Login",
    loginDesc: "Choose your entry method",
    googleLogin: "Sign in with Google",
    guestLogin: "Enter as Guest",
    adminAccess: "Admin Access",
    enterCode: "Enter Secret Access Code",
    incorrectCode: "Incorrect Code!",
    loginAsAdmin: "Log in as Admin",
    notifications: "Notifications",
    activityLog: "Activity Log",
    noNotifications: "No new notifications",
    notificationAdded: "Added item:",
    notificationWithdrawn: "Withdrawn item:",
    notificationWithdrawLimit: "Alert: Low Stock!",
    print: "Print Card",
    saveAndPrint: "Save & Print",
    bluetoothError: "Sorry, your browser doesn't support Bluetooth or connection failed",
    searchingBluetooth: "Searching for Bluetooth printer...",
    connecting: "Connecting...",
    printSuccess: "Data sent to printer successfully",
    prices: "Prices",
    addPrice: "Add New Price",
    priceType: "Part Type",
    priceValue: "Price in IQD",
    iqd: "IQD",
    compatibility: "Compatibility",
    addCompatibility: "Add Compatibility",
    deviceName: "Device Name",
    compatibleDevices: "Compatible Devices (New line for each)",
    compatibilityList: "Compatibility List",
    brandType: "Brand / Type",
    compatibilityResults: "Compatibility Results",
    miscellaneous: "Miscellaneous",
    trackCount: "Number of Tracks",
    logout: "Logout",
    productPrice: "Product Price",
    productImage: "Image URL (Optional)",
    viewImage: "View Image",
  }
};

const MOBILE_BRANDS = [
  "Apple", "Samsung", "Huawei", "Honor", "Xiaomi", "Realme", 
  "Oppo", "Vivo", "Infinix", "Tecno", "Itel", "Nokia", 
  "Sony", "Google", "OnePlus"
];

// Category Icons and Config
const CATEGORIES = [
  { id: "prices", nameKey: "prices", icon: CreditCard, count: 0, color: "from-amber-400 to-rose-600" },
  { id: "compatibility", nameKey: "compatibility", icon: Repeat, count: 0, color: "from-blue-500 to-indigo-600" },
  { id: "screens", nameKey: "screens", icon: Smartphone, count: 0, color: "from-rose-500 to-maroon-600" },
  { id: "batteries", nameKey: "batteries", icon: Battery, count: 0, color: "from-emerald-500 to-maroon-600" },
  { id: "charging_flex", nameKey: "chargingFlex", icon: Zap, count: 0, color: "from-amber-500 to-maroon-600" },
  { id: "disassembled", nameKey: "disassembled", icon: Hammer, count: 0, color: "from-blue-600 to-maroon-600" },
  { id: "speakers", nameKey: "speakers", icon: Headphones, count: 0, color: "from-purple-500 to-maroon-600" },
  { id: "cameras", nameKey: "cameras", icon: Camera, count: 0, color: "from-cyan-500 to-maroon-600" },
  { id: "sim", nameKey: "sim", icon: CreditCard, count: 0, color: "from-orange-500 to-maroon-600" },
  { id: "power_finger", nameKey: "powerFinger", icon: Fingerprint, count: 0, color: "from-pink-500 to-maroon-600" },
  { id: "antennas", nameKey: "antennas", icon: Radio, count: 0, color: "from-lime-500 to-maroon-600" },
  { id: "cpu", nameKey: "cpu", icon: Cpu, count: 0, color: "from-violet-600 to-maroon-600" },
  { id: "motherboard", nameKey: "motherboard", icon: CircuitBoard, count: 0, color: "from-gray-400 to-maroon-600" },
  { id: "connectors", nameKey: "connectors", icon: Cable, count: 0, color: "from-indigo-500 to-maroon-600" },
  { id: "charging_base", nameKey: "chargingBase", icon: Plug2, count: 0, color: "from-teal-500 to-maroon-600" },
  { id: "miscellaneous", nameKey: "miscellaneous", icon: Folders, count: 0, color: "from-slate-500 to-maroon-600" },
];

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const t = translations[lang];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [activities, setActivities] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Data Migration for Category IDs
  useEffect(() => {
    if (isDataLoaded && products.length > 0) {
      let changed = false;
      const migrated = products.map(p => {
        if (p.category === 'charging-flex') { changed = true; return { ...p, category: 'charging_flex' }; }
        if (p.category === 'charging-base') { changed = true; return { ...p, category: 'charging_base' }; }
        return p;
      });
      if (changed) {
        setProducts(migrated);
      }
    }
  }, [products.length, isDataLoaded]);

  // Initialize folders
  useEffect(() => {
    const initFolders = async () => {
      const { value: f } = await Preferences.get({ key: 'folders' });
      let currentFolders = f ? JSON.parse(f) : [];
      setFolders(currentFolders);
    };
    initFolders();

    // Request Notification Permissions
    const requestPerms = async () => {
      if ("Notification" in window && Notification.permission === "default") {
        await Notification.requestPermission();
      }
      try {
        const status = await LocalNotifications.checkPermissions();
        if (status.display !== 'granted') {
          await LocalNotifications.requestPermissions();
        }
      } catch (err) {
        console.log("Local notifications not supported on this platform", err);
      }
    };
    requestPerms();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"product" | "folder" | "customer" | "edit_product" | "edit_customer" | "price" | "compatibility" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maintenanceSearchQuery, setMaintenanceSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'quantity' | 'brand'>('name');

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, selectedFolder]);

  // Form States
  const [custName, setCustName] = useState("");
  const [custDevice, setCustDevice] = useState("");
  const [custIssue, setCustIssue] = useState("");
  const [custCost, setCustCost] = useState("");

  const [prodName, setProdName] = useState("");
  const [prodQty, setProdQty] = useState("");
  const [prodLoc, setProdLoc] = useState("");
  const [prodBrand, setProdBrand] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodImage, setProdImage] = useState("");

  const [pricePartName, setPricePartName] = useState("");
  const [pricePartCategory, setPricePartCategory] = useState("");
  const [priceAmount, setPriceAmount] = useState("");

  const [compDeviceName, setCompDeviceName] = useState("");
  const [compDevicesList, setCompDevicesList] = useState("");

  const [folderName, setFolderName] = useState("");

  const [maintenanceRecords, setMaintenanceRecords] = useState<any[]>([]);
  const [withdrawalCount, setWithdrawalCount] = useState(0);
  const [maintenanceFilter, setMaintenanceFilter] = useState<'all' | 'pending' | 'ready'>('all');
  const [isPrinting, setIsPrinting] = useState(false);
  const [inventorySearch, setInventorySearch] = useState("");
  
  const [isAdminCodeOpen, setIsAdminCodeOpen] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const [priceRecords, setPriceRecords] = useState<any[]>([]);

  const [compatibilityRecords, setCompatibilityRecords] = useState<any[]>([]);
  const [expandedCompatibilityId, setExpandedCompatibilityId] = useState<string | null>(null);

  const [longPressedFolderId, setLongPressedFolderId] = useState<string | null>(null);
  const longPressTimer = useRef<any>(null);

  const [toast, setToast] = useState<{message: string, show: boolean, type: 'success' | 'error' | 'info'}>({message: '', show: false, type: 'info'});

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({message, show: true, type});
    setTimeout(() => setToast(prev => ({...prev, show: false})), 3000);
  };

  const startLongPress = (id: string) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressedFolderId(id);
    }, 800);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleDeleteFolder = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المجلد؟' : 'Are you sure you want to delete this folder?')) {
      setFolders(prev => prev.filter(f => f.id !== id));
      setLongPressedFolderId(null);
      showToast(lang === 'ar' ? 'تم حذف المجلد بنجاح' : 'Folder deleted successfully');
    }
  };

  // Compatibility and Price Records initialization...
  useEffect(() => {
    const initDevice = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({ style: Style.Dark });
      } catch (e) {
        console.log('StatusBar not available', e);
      }
    };
    initDevice();
  }, []);

  // Load data from Capacitor Preferences
  useEffect(() => {
    const initData = async () => {
      // CLEAR ALL DATA FOR PRODUCTION (ONE-TIME RUN)
      const { value: isCleared } = await Preferences.get({ key: 'prod_v1_cleared' });
      if (isCleared !== 'true') {
        await Preferences.clear();
        await Preferences.set({ key: 'prod_v1_cleared', value: 'true' });
        setIsDataLoaded(true);
        return;
      }

      const { value: p } = await Preferences.get({ key: 'products' });
      if (p) setProducts(JSON.parse(p));

      const { value: f } = await Preferences.get({ key: 'folders' });
      if (f) setFolders(JSON.parse(f));

      const { value: m } = await Preferences.get({ key: 'maintenance_records' });
      if (m) setMaintenanceRecords(JSON.parse(m));

      const { value: w } = await Preferences.get({ key: 'withdrawal_count' });
      if (w) setWithdrawalCount(parseInt(w));

      const { value: l } = await Preferences.get({ key: 'lang' });
      if (l) setLang(l as Language);

      const { value: a } = await Preferences.get({ key: 'activities' });
      if (a) setActivities(JSON.parse(a));

      const { value: pr } = await Preferences.get({ key: 'priceRecords' });
      if (pr) setPriceRecords(JSON.parse(pr));

      const { value: cr } = await Preferences.get({ key: 'compatibilityRecords' });
      if (cr) setCompatibilityRecords(JSON.parse(cr));

      const { value: auth } = await Preferences.get({ key: 'isLoggedIn' });
      if (auth === 'true') {
        setIsLoggedIn(true);
        const { value: u } = await Preferences.get({ key: 'user' });
        if (u) setCurrentUser(JSON.parse(u));
      }
      setIsDataLoaded(true);
    };
    initData();
  }, []);

  // Save data to Capacitor Preferences
  useEffect(() => { if (isDataLoaded) saveData('products', products); }, [products, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) saveData('folders', folders); }, [folders, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) saveData('maintenance_records', maintenanceRecords); }, [maintenanceRecords, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Preferences.set({ key: 'withdrawal_count', value: withdrawalCount.toString() }); }, [withdrawalCount, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) Preferences.set({ key: 'lang', value: lang }); }, [lang, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) saveData('activities', activities); }, [activities, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) saveData('priceRecords', priceRecords); }, [priceRecords, isDataLoaded]);
  useEffect(() => { if (isDataLoaded) saveData('compatibilityRecords', compatibilityRecords); }, [compatibilityRecords, isDataLoaded]);
  useEffect(() => { 
    if (isDataLoaded) {
      Preferences.set({ key: 'isLoggedIn', value: isLoggedIn.toString() });
      if (currentUser) Preferences.set({ key: 'user', value: JSON.stringify(currentUser) });
    }
  }, [isLoggedIn, currentUser, isDataLoaded]);

  const saveData = async (key: string, data: any) => {
    await Preferences.set({ key, value: JSON.stringify(data) });
  };

  // Navigation handling for mobile back button
  useEffect(() => {
    const onPopState = () => {
      if (activeForm) {
        setActiveForm(null);
      } else if (isAddMenuOpen) {
        setIsAddMenuOpen(false);
      } else if (isNotificationsOpen) {
        setIsNotificationsOpen(false);
      } else if (isPrinting) {
        setIsPrinting(false);
      } else if (selectedFolder) {
        setSelectedFolder(null);
      } else if (selectedCategory) {
        setSelectedCategory(null);
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [activeForm, isAddMenuOpen, isNotificationsOpen, isPrinting, selectedFolder, selectedCategory]);

  useEffect(() => {
    // If we are "in" a state, push state to handle the back button popping correctly
    if (selectedCategory || selectedFolder || activeForm || isAddMenuOpen || isNotificationsOpen) {
       if (!window.history.state || window.history.state.appLevel !== 1) {
         window.history.pushState({ appLevel: 1 }, "");
       }
    }
  }, [selectedCategory, selectedFolder, activeForm, isAddMenuOpen, isNotificationsOpen]);

  const filteredInventory = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.loc?.toLowerCase().includes(inventorySearch.toLowerCase())
    );
  }, [inventorySearch, products]);

  const filteredCompatibility = useMemo(() => {
    let filtered = compatibilityRecords;
    if (selectedFolder) {
      filtered = filtered.filter(r => r.brand?.toLowerCase() === selectedFolder.toLowerCase());
    }
    const term = (searchQuery || inventorySearch).toLowerCase();
    if (term) {
      filtered = filtered.filter(r => 
        r.deviceName.toLowerCase().includes(term) || 
        r.compatibleItems.some((item: string) => item.toLowerCase().includes(term))
      );
    }
    return filtered;
  }, [compatibilityRecords, inventorySearch, searchQuery, selectedFolder]);

  const filteredPriceRecords = useMemo(() => {
    const term = inventorySearch.toLowerCase();
    return priceRecords.filter(p => {
      const category = CATEGORIES.find(c => c.id === p.category);
      const categoryLabel = category ? (t[category.nameKey as keyof typeof t] || "").toLowerCase() : p.category.toLowerCase();
      return p.name.toLowerCase().includes(term) || categoryLabel.includes(term);
    });
  }, [inventorySearch, priceRecords, lang]);

  // Web Bluetooth Printing Logic (Skeleton)
  const handlePrintRecord = async (record: any) => {
    try {
      setIsPrinting(true);
      // Basic check for Web Bluetooth support
      const nav = navigator as any;
      if (!nav.bluetooth) {
        alert(t.bluetoothError);
        setIsPrinting(false);
        return;
      }

      // Request Bluetooth Device (Filtering for printers if possible, or generic)
      // Note: This requires a secure context and user interaction
      const device = await nav.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb'] // Common printer service UUID prototype
      });

      if (!device) throw new Error("No device selected");

      console.log("Connecting to GATT Server...");
      const server = await device.gatt?.connect();
      
      // Here you would find the write characteristic and send ESC/POS commands
      // For now, we simulate the transfer
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`${t.printSuccess}: ${record.customerName}`);
    } catch (error) {
      console.error("Bluetooth Print Error:", error);
      // Fallback to standard printing simulation for demo
      alert(t.bluetoothError);
    } finally {
      setIsPrinting(false);
    }
  };

  const saveMaintenanceRecord = () => {
    if (!custName.trim()) return null;
    
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    let finalRecord: any;

    if (activeForm === "customer-edit" || activeForm === "edit_customer") {
      finalRecord = {
        id: editingId,
        customerName: custName,
        deviceType: custDevice,
        issue: custIssue,
        cost: custCost,
        // Preserve unedited fields if needed or refetch from state
      };
      
      setMaintenanceRecords(prev => {
        const updated = prev.map(r => 
          r.id === editingId ? { ...r, ...finalRecord } : r
        );
        return updated;
      });
      
      // Get the full record for printing (after merging)
      const existing = maintenanceRecords.find(r => r.id === editingId);
      finalRecord = { ...existing, ...finalRecord };
    } else {
      finalRecord = {
        id: Date.now(),
        customerName: custName,
        deviceType: custDevice,
        issue: custIssue,
        cost: custCost,
        isReady: false,
        entryDate: formattedDate,
        readyDate: null
      };
      setMaintenanceRecords(prev => [finalRecord, ...prev]);
      addActivity(
        lang === 'ar' ? 'إضافة بطاقة صيانة' : 'Add Maintenance Card',
        `${lang === 'ar' ? 'تمت إضافة بطاقة لـ' : 'Added card for'} ${finalRecord.customerName} (${finalRecord.deviceType})`,
        'add'
      );
    }
    return finalRecord;
  };

  const handleAddAndPrint = async (e: FormEvent) => {
    e.preventDefault();
    const record = saveMaintenanceRecord();
    if (record) {
      await handlePrintRecord(record);
      closeModals();
    }
  };


  const addActivity = (title: string, desc: string, type: 'add' | 'withdraw' | 'alert') => {
    const newActivity = {
      id: Date.now(),
      title,
      desc,
      type,
      time: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-IQ' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-IQ' : 'en-US')
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 50));
    setHasUnread(true);
  };

  const toggleReady = (id: number) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMaintenanceRecords(prev => {
      const updated = prev.map(rec => 
        rec.id === id ? { 
          ...rec, 
          isReady: !rec.isReady,
          readyDate: !rec.isReady ? formattedDate : null
        } : rec
      );
      const target = updated.find(r => r.id === id);
      if (target) {
        showToast(target.isReady ? (lang === 'ar' ? 'تم تجهيز البطاقة' : 'Card marked ready') : (lang === 'ar' ? 'البطاقة قيد العمل' : 'Card in progress'), 'info');
      }
      return updated;
    });
  };

  const withdrawProduct = (id: number) => {
    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === id) {
          const newQty = Math.max(0, p.quantity - 1);
          Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
          addActivity(
            t.activity_withdraw,
            `${t.notificationWithdrawn} ${p.name} (${t.quantity}: ${p.quantity} -> ${newQty})`,
            'withdraw'
          );
          if (newQty < 3 && newQty > 0) {
            addActivity(t.notificationWithdrawLimit, `${p.name} ${t.quantity}: ${newQty}`, 'alert');
          }
          showToast(lang === 'ar' ? 'تم سحب القطعة بنجاح' : 'Product withdrawn successfully');
          return { ...p, quantity: newQty };
        }
        return p;
      });
      return updated;
    });
    setWithdrawalCount(prev => prev + 1);
  };

  const incrementProduct = (id: number) => {
    setProducts(prev => {
      const updated = prev.map(p => 
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      );
      return updated;
    });
  };

  const deleteProduct = (id: number) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه القطعة؟' : 'Are you sure you want to delete this piece?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const deleteRecord = (id: number) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه البطاقة؟' : 'Are you sure you want to delete this card?')) {
      setMaintenanceRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  // Search logic
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const closeModals = () => {
    setIsAddMenuOpen(false);
    setActiveForm(null);
    setEditingId(null);
    setCustName("");
    setCustDevice("");
    setCustIssue("");
    setCustCost("");
    setProdName("");
    setProdQty("");
    setProdLoc("");
    setProdBrand(selectedFolder || "");
    setProdCategory(selectedCategory && selectedCategory !== "maintenance" && selectedCategory !== "all_inventory" ? selectedCategory : "");
    setProdPrice("");
    setProdImage("");
    setFolderName("");
    setPricePartName("");
    setPricePartCategory("");
    setPriceAmount("");
    setCompDeviceName("");
    setCompDevicesList("");
  };

  const handleAddCompatibility = (e: FormEvent) => {
    e.preventDefault();
    if (!compDeviceName.trim() || !compDevicesList.trim()) return;

    const newRecord = {
      id: Date.now(),
      deviceName: compDeviceName,
      brand: prodBrand || selectedFolder || "Others",
      compatibleItems: compDevicesList.split('\n').filter(i => i.trim() !== ""),
    };

    setCompatibilityRecords(prev => [newRecord, ...prev]);
    addActivity(
      lang === 'ar' ? 'إضافة توافق' : 'Add Compatibility',
      `${compDeviceName}`,
      'add'
    );
    closeModals();
  };

  const deleteCompatibility = (id: number) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا السجل؟' : 'Are you sure you want to delete this record?')) {
      setCompatibilityRecords(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddPrice = (e: FormEvent) => {
    e.preventDefault();
    if (!priceAmount.trim() || !pricePartName.trim()) return;

    const newRecord = {
      id: Date.now(),
      name: pricePartName,
      category: pricePartCategory || "screens",
      price: priceAmount,
    };

    setPriceRecords(prev => [newRecord, ...prev]);
    addActivity(
      lang === 'ar' ? 'إضافة سعر' : 'Add Price',
      `${pricePartName} - ${priceAmount} ${t.iqd}`,
      'add'
    );
    closeModals();
  };

  const deletePrice = (id: number) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا السعر؟' : 'Are you sure you want to delete this price?')) {
      setPriceRecords(prev => prev.filter(p => p.id !== id));
    }
  };

  const startEditProduct = (product: any) => {
    setEditingId(product.id);
    setProdName(product.name);
    setProdQty(product.quantity.toString());
    setProdLoc(product.loc);
    setProdBrand(product.brand);
    setProdCategory(product.category);
    setActiveForm("edit_product");
  };

  const startEditCustomer = (rec: any) => {
    setEditingId(rec.id);
    setCustName(rec.customerName);
    setCustDevice(rec.deviceType);
    setCustIssue(rec.issue);
    setCustCost(rec.cost);
    setActiveForm("edit_customer");
  };

  const handleEditProduct = (e: FormEvent) => {
    e.preventDefault();
    if (editingId && prodName) {
      setProducts(prev => prev.map(p => 
        p.id === editingId ? {
          ...p,
          name: prodName,
          quantity: parseInt(prodQty) || 0,
          loc: prodLoc,
          brand: prodBrand,
          category: prodCategory || p.category || "screens",
          price: prodPrice,
          image: prodImage
        } : p
      ));
      closeModals();
    }
  };

  const handleEditCustomer = (e: FormEvent) => {
    e.preventDefault();
    saveMaintenanceRecord();
    closeModals();
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    if (prodName) {
      const targetBrand = prodBrand || selectedFolder || "Others";
      const newProduct = {
        id: Date.now(),
        name: prodName,
        quantity: parseInt(prodQty) || 0,
        loc: prodLoc,
        brand: targetBrand,
        category: prodCategory || (selectedCategory && !["all_inventory", "maintenance", "prices", "compatibility"].includes(selectedCategory) ? selectedCategory : "screens"),
        price: prodPrice,
        image: prodImage,
        createdAt: new Date().toLocaleDateString()
      };
      setProducts(prev => [newProduct, ...prev]);
      
      addActivity(
        t.activity_add,
        `${t.notificationAdded} ${newProduct.name} (${t.quantity}: ${newProduct.quantity})`,
        'add'
      );
      closeModals();
    }
  };

  const handleAddFolder = (e: FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    const newFolder = {
      id: `${selectedCategory || "screens"}-${folderName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: folderName,
      categoryId: selectedCategory || "screens",
      count: 0
    };
    setFolders(prev => [...prev, newFolder]);
    closeModals();
  };

  const handleAddCustomer = (e: FormEvent) => {
    e.preventDefault();
    saveMaintenanceRecord();
    closeModals();
  };

  const handleLogin = (method: 'google' | 'guest' | 'admin') => {
    if (method === 'admin') {
      if (secretCode === "1902") {
        setIsLoggedIn(true);
        setCurrentUser({
          name: 'Admin',
          type: 'admin',
          avatar: 'https://ui-avatars.com/api/?name=Admin&background=F43F5E&color=fff'
        });
        setIsAdminCodeOpen(false);
        setSecretCode("");
        setCodeError(false);
      } else {
        setCodeError(true);
        setTimeout(() => setCodeError(false), 1000);
      }
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser({
      name: method === 'google' ? 'Hamad' : 'Guest User',
      type: method,
      avatar: method === 'google' ? 'https://ui-avatars.com/api/?name=Hamad&background=F43F5E&color=fff' : null
    });
  };

  if (!isLoggedIn) {
    return (
      <>
        <div className={`min-h-screen bg-maroon-950 text-maroon-50 font-sans relative overflow-hidden flex items-center justify-center p-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)] ${lang === 'en' ? '' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-900/40 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-maroon-900/30 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full glass p-8 rounded-[2.5rem] text-center space-y-8 shadow-2xl relative z-10 border border-white/5"
        >
              <div className="space-y-2">
                <div className="w-16 h-16 bg-rose-600 rounded-[1.25rem] mx-auto flex items-center justify-center shadow-lg shadow-rose-950/50 rotate-3 group-hover:rotate-6 transition-transform overflow-hidden relative">
                  <img src="assets/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => {
                    (e.target as any).classList.add('hidden');
                    (e.target as any).nextElementSibling.classList.remove('hidden');
                  }} />
                  <Smartphone className="w-8 h-8 text-white hidden" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-l from-maroon-100 to-rose-400 bg-clip-text text-transparent">
                    {t.title}
                  </h1>
                  <p className="text-maroon-400 text-[10px] font-medium opacity-60 italic">{t.loginDesc}</p>
                </div>
              </div>

          <div className="space-y-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin('guest')}
              className="w-full glass-dark py-4 rounded-2xl flex items-center justify-between px-6 hover:bg-white/10 transition-all group overflow-hidden relative border border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-rose-500/20 group-hover:text-rose-400 transition-all">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className={`text-${lang === 'ar' ? 'right' : 'left'}`}>
                  <span className="font-bold text-base block">{t.guestLogin}</span>
                  <span className="text-[10px] text-maroon-400 opacity-60">
                    {lang === 'ar' ? 'تصفح المخزن فقط' : 'Browse stock only'}
                  </span>
                </div>
              </div>
              <ChevronLeft className={`w-4 h-4 text-maroon-600 group-hover:text-rose-400 transition-all ${lang === 'ar' ? '' : 'rotate-180'}`} />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAdminCodeOpen(true)}
              className="w-full glass-dark py-4 rounded-2xl flex items-center justify-between px-6 hover:bg-white/10 transition-all group overflow-hidden relative border border-rose-500/20 bg-rose-500/5 shadow-inner shadow-rose-500/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div className={`text-${lang === 'ar' ? 'right' : 'left'}`}>
                  <span className="font-bold text-base block">{t.adminAccess}</span>
                  <span className="text-[10px] text-maroon-400 opacity-60">
                    {lang === 'ar' ? 'لوحة تحكم كاملة' : 'Full access panel'}
                  </span>
                </div>
              </div>
              <ChevronLeft className={`w-4 h-4 text-maroon-600 group-hover:text-rose-400 transition-all ${lang === 'ar' ? '' : 'rotate-180'}`} />
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-[10px] font-bold text-rose-500/60 hover:text-rose-500 transition-colors uppercase tracking-widest border-b border-transparent hover:border-rose-500/30 pb-0.5"
            >
              {lang === 'ar' ? 'English Version' : 'النسخة العربية'}
            </button>
          </div>
        </motion.div>

        {/* Admin Code Popup */}
        <AnimatePresence>
          {isAdminCodeOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAdminCodeOpen(false)}
                className="absolute inset-0 bg-maroon-950/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  x: codeError ? [0, -10, 10, -10, 10, 0] : 0
                }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="max-w-xs w-full glass p-6 rounded-[2rem] relative z-10 border border-white/10 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-rose-600/20 rounded-xl flex items-center justify-center text-rose-400">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <button 
                    onClick={() => setIsAdminCodeOpen(false)}
                    className="p-2 text-maroon-500 hover:text-rose-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold">{t.adminAccess}</h3>
                  <p className="text-[10px] text-maroon-400">{t.enterCode}</p>
                </div>

                <div className="space-y-3">
                  <input 
                    type="password"
                    value={secretCode}
                    autoFocus
                    onChange={(e) => setSecretCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin('admin')}
                    className={`w-full bg-white/5 border ${codeError ? 'border-rose-500' : 'border-white/10'} rounded-xl px-4 py-3 text-center text-xl font-bold tracking-widest text-maroon-100 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all placeholder:text-maroon-800`}
                    placeholder="****"
                  />
                  {codeError && (
                    <p className="text-[10px] text-rose-500 text-center font-bold">{t.incorrectCode}</p>
                  )}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLogin('admin')}
                    className="w-full bg-rose-600 py-3 rounded-xl font-bold text-sm shadow-lg shadow-rose-600/20 hover:bg-rose-500 transition-colors"
                  >
                    {t.loginAsAdmin}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      </>
    );
  }

  return (
    <>
      <div className={`min-h-screen bg-maroon-950 text-maroon-50 font-sans p-2 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)] relative selection:bg-rose-500/30 ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Dynamic background blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-maroon-900/20 rounded-full blur-[100px]" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-24 left-1/2 z-[9999] glass px-6 py-3 rounded-full border shadow-2xl flex items-center gap-3 min-w-[200px] justify-center ${
              toast.type === 'success' ? 'border-emerald-500/30 text-emerald-400' :
              toast.type === 'error' ? 'border-rose-500/30 text-rose-400' :
              'border-blue-500/30 text-blue-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              toast.type === 'success' ? 'bg-emerald-500' :
              toast.type === 'error' ? 'bg-rose-500' :
              'bg-blue-500'
            }`} />
            <span className="font-bold text-xs uppercase tracking-widest">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-1.5 md:p-2 glass-dark rounded-xl mb-2 relative z-[100] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Right side (Title) */}
          <motion.div 
            initial={{ x: lang === 'ar' ? 20 : -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-1.5 md:gap-2"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-rose-600 rounded-lg flex items-center justify-center shadow-md overflow-hidden relative">
              <img src="assets/logo.png" alt="Icon" className="w-full h-full object-cover" onError={(e) => {
                (e.target as any).classList.add('hidden');
                (e.target as any).nextElementSibling.classList.remove('hidden');
              }} />
              <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-white hidden" />
            </div>
            <h1 className="text-base md:text-lg font-black tracking-tight bg-gradient-to-l from-maroon-100 to-rose-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
          </motion.div>

          {/* Left side (Actions) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/5 p-1 px-2 rounded-xl border border-white/5">
              {currentUser?.avatar && (
                <img src={currentUser.avatar} className="w-5 h-5 rounded-md shadow-lg" alt="Avatar" />
              )}
              <div className="hidden md:block">
                <div className="text-[10px] font-bold leading-tight line-clamp-1 max-w-[100px]">{currentUser?.name}</div>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="p-1.5 hover:text-rose-400 transition-colors"
                title={t.logout}
              >
                <LogOut size={14} />
              </button>
            </div>

            <button 
              onClick={() => {
                setHasUnread(false);
                setIsNotificationsOpen(true);
              }}
              className="relative p-2 rounded-lg text-rose-400 hover:bg-white/10 transition-all"
            >
              <Bell size={18} />
              {hasUnread && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-maroon-950 animate-pulse" />
              )}
            </button>

            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2 py-1 rounded-lg text-[10px] font-bold border border-white/10 hover:bg-white/10 transition-all text-rose-400"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>
          </div>
        </header>

        {/* Global Search Bar */}
        <div className="max-w-xl mx-auto mb-4 relative group px-2">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`glass-dark px-3 py-2 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-xl ${isSearchFocused ? 'ring-2 ring-rose-500/50 bg-maroon-900/60' : 'border border-white/5'}`}
          >
            <Search className={`w-3.5 h-3.5 transition-colors ${isSearchFocused ? 'text-rose-400' : 'text-maroon-400'}`} />
            <input 
              type="text" 
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder} 
              className="bg-transparent border-none outline-none text-xs text-maroon-100 placeholder:text-maroon-500/50 w-full"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="hover:text-rose-400 transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>

            {/* Live Search Results Popover */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden shadow-2xl border-white/10 z-[110] max-h-[300px] overflow-y-auto custom-scrollbar"
            >
              {filteredResults.length > 0 ? (
                <div className="p-1 space-y-0.5">
                  <div className="px-2 py-0.5 text-[8px] font-bold text-maroon-400 uppercase tracking-widest border-b border-white/5 mb-0.5">
                    {lang === 'ar' ? 'نتائج البحث' : 'Search Results'} ({filteredResults.length})
                  </div>
                  {filteredResults.map((product) => (
                    <div
                      key={product.id}
                      className="w-full text-right px-2 py-1 rounded-lg hover:bg-white/5 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className={`p-1 rounded-lg ${product.quantity < 3 ? 'bg-amber-500/20 text-amber-500' : 'bg-rose-500/20 text-rose-400'}`}>
                          {product.category === 'screens' ? <Smartphone size={10} /> : <Zap size={10} />}
                        </div>
                        <div>
                            <div className="font-bold text-[9px] text-maroon-50">{product.name}</div>
                            <div className="text-[7px] text-maroon-400 flex gap-1">
                              <span className={product.quantity < 3 ? 'text-amber-500' : ''}>{t.quantity}: {product.quantity}</span>
                              <span>•</span>
                              <span>{t.location}: {product.loc}</span>
                            </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => startEditProduct(product)}
                          className="p-1 text-maroon-700 hover:text-emerald-500 transition-colors"
                        >
                          <Settings size={9} />
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={product.quantity <= 0}
                          onClick={() => withdrawProduct(product.id)}
                          className={`px-1.5 py-0.5 rounded-md text-[7px] font-bold transition-all flex items-center gap-1 ${
                            product.quantity > 0 
                            ? 'bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white' 
                            : 'bg-maroon-900/40 text-maroon-600 cursor-not-allowed'
                          }`}
                        >
                          <History size={7} />
                          {t.withdrawPiece}
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-maroon-500">
                  <div className="mb-1 flex justify-center">
                    <Search className="w-4 h-4 opacity-20" />
                  </div>
                  <p className="text-[10px]">لا توجد نتائج مطابقة لـ "{searchQuery}"</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        {/* Main Dashboard View */}
        {!selectedCategory && (
          <div className="space-y-2 mb-4">
            {/* Quick Compatibility Results when searching */}
            {searchQuery && filteredCompatibility.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 space-y-2"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-1 bg-blue-500 rounded-full" />
                  <h2 className="text-[9px] font-bold text-blue-100 uppercase tracking-widest">{t.compatibilityResults}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredCompatibility.slice(0, 4).map(comp => (
                    <div 
                      key={comp.id} 
                      className="glass-dark p-2 rounded-lg border border-blue-500/10 flex flex-col gap-1 cursor-pointer hover:bg-white/5 transition-all"
                      onClick={() => {
                        setSelectedCategory('compatibility');
                        setInventorySearch(comp.deviceName);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone size={12} className="text-blue-400" />
                        <span className="text-[11px] font-bold text-white">{comp.deviceName}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {comp.compatibleItems.slice(0, 3).map((item: string, i: number) => (
                          <span key={i} className="text-[8px] bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded-md border border-blue-500/20">
                            {item}
                          </span>
                        ))}
                        {comp.compatibleItems.length > 3 && (
                          <span className="text-[8px] text-maroon-600">+{comp.compatibleItems.length - 3}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredCompatibility.length > 0 && (
                    <button 
                      onClick={() => {
                        setSelectedCategory('compatibility');
                        setSearchQuery("");
                      }}
                      className="col-span-full text-[9px] text-blue-400 font-bold hover:underline py-0.5 text-center"
                    >
                      {lang === 'ar' ? 'عرض جميع نتائج التوافق' : 'Show all compatibility results'}
                    </button>
                  )}
                </div>
                <div className="h-px bg-white/5 w-full my-2" />
              </motion.div>
            )}

            {/* Long Vertical Rectangle - Maintenance Status */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => setSelectedCategory("maintenance")}
              className="glass rounded-xl p-3 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all cursor-pointer shadow-xl shadow-black/30 min-h-[100px] border border-white/10"
            >
              <div className="p-2 bg-rose-600 rounded-lg mb-2 group-hover:scale-110 transition-transform">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div className="text-[10px] text-maroon-300 mb-0.5 uppercase font-bold tracking-widest">{t.maintenanceStatus}</div>
              <div className="text-2xl font-bold text-white">
                {maintenanceRecords.filter(r => !r.isReady).length}
              </div>
              <div className="text-[8px] text-maroon-500 mt-1 font-bold uppercase tracking-tight opacity-70">
                {lang === 'ar' ? 'بطاقات الصيانة الحالية' : 'Current Maintenance Cards'}
              </div>
            </motion.div>

            {/* Two Side-by-Side Sections */}
            <div className="grid grid-cols-2 gap-2">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setSelectedCategory("all_inventory")}
                className="glass rounded-lg p-2.5 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all cursor-pointer shadow-lg shadow-black/20 border border-white/5"
              >
                <div className="p-1.5 bg-rose-600/20 rounded-md mb-1 group-hover:rotate-6 transition-transform">
                  <Package className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className="text-[8px] text-maroon-400 mb-0.5 uppercase font-bold tracking-tight">{t.totalItems}</div>
                <div className="text-lg font-bold">{products.reduce((acc, p) => acc + p.quantity, 0)}</div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setIsNotificationsOpen(true)}
                className="glass rounded-lg p-2.5 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all cursor-pointer shadow-lg shadow-black/20 border border-white/5"
              >
                <div className="p-1.5 bg-rose-600/20 rounded-md mb-1 group-hover:-rotate-6 transition-transform">
                  <History className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className="text-[8px] text-maroon-400 mb-0.5 uppercase font-bold tracking-tight">{t.withdrawals}</div>
                <div className="text-lg font-bold">{withdrawalCount}</div>
              </motion.div>
            </div>

            {/* Categories Grid Restored */}
            <div className="pt-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mb-2"
              >
                <div className="h-2.5 w-1 bg-rose-600 rounded-full" />
                <h2 className="text-[12px] font-bold text-maroon-100 uppercase tracking-widest">{t.mainCategories}</h2>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
              >
                {CATEGORIES.filter(c => c.id !== 'all_inventory' && c.id !== 'maintenance').map((cat) => {
                  const catCount = cat.id === 'prices' ? priceRecords.length : 
                                   cat.id === 'compatibility' ? compatibilityRecords.length :
                                   products.filter(p => p.category === cat.id).reduce((acc, p) => acc + p.quantity, 0);
                  
                  const countLabel = cat.id === 'prices' ? (lang === 'ar' ? 'سعر' : 'price') : 
                                     cat.id === 'compatibility' ? (lang === 'ar' ? 'سجل' : 'record') :
                                     t.piece;
                  return (
                    <motion.div
                      key={cat.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedFolder(null);
                        setInventorySearch("");
                      }}
                      className="group cursor-pointer relative overflow-hidden"
                    >
                      <div className="glass rounded-lg p-2 h-full flex flex-col items-center justify-center relative z-10 text-center transition-all bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 min-h-[70px]">
                        <div className={`p-1.5 rounded-md bg-gradient-to-br ${cat.color} shadow-md shadow-maroon-900/40 mb-1.5 group-hover:rotate-6 transition-transform`}>
                          <cat.icon className="w-3 h-3 text-white" />
                        </div>
                        <h3 className="text-[10px] font-bold mb-0.5 group-hover:text-rose-300 transition-colors line-clamp-1">{t[cat.nameKey as keyof typeof t]}</h3>
                        <div className="flex items-center gap-1 text-[8px] text-maroon-400 font-bold uppercase opacity-60">
                          <span className="text-rose-400">{catCount}</span>
                          <span>{countLabel}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        )}

        {/* Categories / Content */}
        <main>
          {selectedCategory && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (selectedFolder) {
                        setSelectedFolder(null);
                      } else {
                        setSelectedCategory(null);
                      }
                    }}
                    className="glass px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-rose-500/10 transition-colors group text-[10px] border border-white/5 active:scale-95"
                  >
                    {lang === 'ar' ? <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> : <ChevronLeft className="w-3 h-3 rotate-180 group-hover:translate-x-0.5 transition-transform" />}
                    <span>{t.backToCategories}</span>
                  </button>
                  
                  <div className="flex items-center gap-1.5 text-maroon-500 text-[10px] opacity-40">
                    <span>/</span>
                    <span className="font-medium text-maroon-300">
                      {CATEGORIES.find(c => c.id === selectedCategory) ? t[CATEGORIES.find(c => c.id === selectedCategory)!.nameKey as keyof typeof t] : selectedCategory}
                    </span>
                    {selectedFolder && (
                      <>
                        <span>/</span>
                        <span className="font-bold text-rose-400">{selectedFolder}</span>
                      </>
                    )}
                  </div>
                </div>
                {currentUser?.type === 'admin' && (
                  <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                    {(() => {
                      const catProducts = products.filter(p => p.category === selectedCategory && (!selectedFolder || p.brand.toLowerCase() === selectedFolder.toLowerCase()));
                      const totalQty = catProducts.reduce((acc, p) => acc + p.quantity, 0);
                      return `${t.totalItems}: ${totalQty}`;
                    })()}
                  </div>
                )}
              </div>

              {/* Filters / Sorting inside Category */}
              {selectedCategory && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  <div className="relative flex-1 min-w-[150px]">
                    <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon-600" />
                    <input 
                      type="text" 
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-[10px] outline-none focus:ring-1 focus:ring-rose-500/30 transition-all text-maroon-100"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                    {(['name', 'quantity', 'brand'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setSortBy(s)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all ${sortBy === s ? 'bg-rose-600 text-white shadow-lg' : 'text-maroon-500 hover:text-maroon-300'}`}
                      >
                        {lang === 'ar' ? (s === 'name' ? 'الاسم' : s === 'quantity' ? 'الكمية' : 'الماركة') : s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

          {/* Sub-Folders View (Generalized for all categories) */}
          {selectedCategory && !["all_inventory", "maintenance", "prices", "compatibility"].includes(selectedCategory) && !selectedFolder && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {(() => {
                      const currentCategoryFolders = folders.filter(f => f.categoryId === selectedCategory);
                      
                      return currentCategoryFolders.map((company, idx) => {
                        const isSelectedForDeletion = longPressedFolderId === company.id;
                        const prodCount = products.filter(p => {
                          if (p.category !== selectedCategory) return false;
                          const pBrand = (p.brand || "").toLowerCase();
                          return pBrand === company.name.toLowerCase();
                        }).length;

                        return (
                          <motion.div
                            key={`${company.id}-${idx}`}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (longPressedFolderId) {
                                setLongPressedFolderId(null);
                              } else {
                                setSelectedFolder(company.name);
                              }
                            }}
                            onMouseDown={() => startLongPress(company.id)}
                            onMouseUp={cancelLongPress}
                            onMouseLeave={cancelLongPress}
                            onTouchStart={() => startLongPress(company.id)}
                            onTouchEnd={cancelLongPress}
                            className="relative glass rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer group hover:bg-rose-900/20 transition-all border-rose-900/0 hover:border-rose-500/30"
                          >
                            {isSelectedForDeletion && (
                              <div
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                onMouseUp={(e) => e.stopPropagation()}
                                onTouchEnd={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleDeleteFolder(company.id, e);
                                }}
                                className="absolute -top-3 -right-3 p-3 bg-gradient-to-br from-rose-500 to-rose-700 text-white rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] z-[100] cursor-pointer hover:scale-110 active:scale-90 transition-all border-2 border-white/30"
                              >
                                <Trash2 size={18} />
                              </div>
                            )}
                            <div className="p-2 bg-maroon-900/40 rounded-lg mb-2 group-hover:bg-rose-600 group-hover:text-white transition-all text-rose-500">
                              <Folder className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-xs">{company.nameKey ? t[company.nameKey as keyof typeof t] : company.name}</span>
                            <span className="text-[9px] text-maroon-500 mt-0.5">{prodCount} {t.piece}</span>
                          </motion.div>
                        );
                      });
                    })()}
                    
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveForm("folder")}
                      className="glass border-dashed border-maroon-800 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer group hover:border-rose-500/50 transition-all"
                    >
                      <div className="p-2 bg-white/5 rounded-lg mb-2 group-hover:bg-rose-600/20 transition-all text-maroon-700 group-hover:text-rose-400">
                        <FolderPlus className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-[10px] text-maroon-500">{t.addFolder}</span>
                    </motion.div>
                  </div>

                  {/* Unassigned products header handled below in the product list section */}
                </motion.div>
              )}

              {/* Floating Action Button */}
              {selectedCategory !== "maintenance" && selectedCategory !== "all_inventory" && (
                <div className="fixed bottom-6 left-6 z-50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAddMenuOpen(true)}
                    className="w-12 h-12 rounded-full bg-rose-600 shadow-xl shadow-rose-950/50 flex items-center justify-center group relative overflow-hidden"
                  >
                    <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </div>
              )}

              {/* Add Menu Popover */}
              <AnimatePresence>
                {isAddMenuOpen && !activeForm && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsAddMenuOpen(false)}
                      className="fixed inset-0 bg-maroon-950/60 backdrop-blur-sm z-[60]"
                    />
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0, x: -50, y: 50 }}
                        animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, x: -50, y: 50 }}
                        className="fixed bottom-20 left-6 z-[70] flex flex-col gap-2"
                      >
                        {selectedCategory === "prices" ? (
                          <button 
                            onClick={() => setActiveForm("price")}
                            className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group shadow-xl ring-1 ring-rose-500/30"
                          >
                            <div className="p-1.5 bg-rose-500/20 rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-colors">
                              <CreditCard className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">{t.addPrice}</span>
                          </button>
                        ) : selectedCategory === "compatibility" ? (
                          <button 
                            onClick={() => setActiveForm("compatibility")}
                            className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group shadow-xl ring-1 ring-blue-500/30"
                          >
                            <div className="p-1.5 bg-blue-500/20 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                              <Repeat className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">{t.addCompatibility}</span>
                          </button>
                        ) : selectedCategory === "maintenance" ? (
                          <button 
                            onClick={() => setActiveForm("customer")}
                            className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group shadow-xl ring-1 ring-indigo-500/30"
                          >
                            <div className="p-1.5 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                              <UserPlus className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">{t.addCustomer}</span>
                          </button>
                        ) : selectedCategory && selectedCategory !== "all_inventory" ? (
                          <>
                            <button 
                              onClick={() => {
                                setProdBrand(selectedFolder || "");
                                setProdCategory(selectedCategory && selectedCategory !== "maintenance" && selectedCategory !== "all_inventory" ? selectedCategory : "");
                                setActiveForm("product");
                              }}
                              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group shadow-xl ring-1 ring-emerald-500/30"
                            >
                              <div className="p-1.5 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <FilePlus className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{t.addProduct}</span>
                            </button>
                            <button 
                              onClick={() => setActiveForm("folder")}
                              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group shadow-xl ring-1 ring-amber-500/30"
                            >
                              <div className="p-1.5 bg-amber-500/20 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <FolderPlus className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{t.addFolder}</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => setActiveForm("compatibility")}
                              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all text-maroon-400 group opacity-70 hover:opacity-100"
                            >
                              <div className="p-1.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Repeat className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{t.addCompatibility}</span>
                            </button>
                            <button 
                              onClick={() => setActiveForm("price")}
                              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all text-maroon-400 group opacity-70 hover:opacity-100"
                            >
                              <div className="p-1.5 bg-rose-500/10 rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                <CreditCard className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{t.addPrice}</span>
                            </button>
                            <button 
                              onClick={() => {
                                setProdBrand(selectedFolder || "");
                                setProdCategory(selectedCategory && selectedCategory !== "maintenance" && selectedCategory !== "all_inventory" ? selectedCategory : "");
                                setActiveForm("product");
                              }}
                              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group"
                            >
                              <div className="p-1.5 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <FilePlus className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{t.addProduct}</span>
                            </button>
                            <button 
                              onClick={() => setActiveForm("folder")}
                              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group transition-all"
                            >
                              <div className="p-1.5 bg-amber-500/20 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                <FolderPlus className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{t.addFolder}</span>
                            </button>
                            <button 
                              onClick={() => setActiveForm("customer")}
                              className="glass px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all text-maroon-100 group"
                            >
                              <div className="p-1.5 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <UserPlus className="w-4 h-4" />
                              </div>
                              <span className="font-bold text-sm">{t.addCustomer}</span>
                            </button>
                          </>
                        )}
                      </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Action Modals */}
              <AnimatePresence>
                {activeForm && (
                  <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={closeModals}
                      className="absolute inset-0 bg-maroon-950/80 backdrop-blur-md"
                    />
                    <motion.div 
                      initial={{ y: 50, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 50, opacity: 0, scale: 0.95 }}
                      className="glass w-full max-w-md rounded-[1.5rem] overflow-hidden relative"
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {activeForm === "price" && (
                              <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                                <CreditCard className="w-4 h-4" />
                              </div>
                            )}
                            {activeForm === "compatibility" && (
                              <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                                <Repeat className="w-4 h-4" />
                              </div>
                            )}
                            {activeForm?.includes("product") && (
                              <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                                <FilePlus className="w-4 h-4" />
                              </div>
                            )}
                            {activeForm === "folder" && (
                              <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                                <FolderPlus className="w-4 h-4" />
                              </div>
                            )}
                            {activeForm?.includes("customer") && (
                              <div className="p-2 bg-rose-500/20 rounded-xl text-rose-400">
                                <UserCheck className="w-4 h-4" />
                              </div>
                            )}
                            <div>
                                <h3 className="text-lg font-bold">
                                  {activeForm === "price" ? t.addPrice :
                                   activeForm === "compatibility" ? t.addCompatibility :
                                   activeForm === "product" ? t.addProduct : 
                                   activeForm === "edit_product" ? t.editData :
                                   activeForm === "folder" ? t.addFolder : 
                                   activeForm === "edit_customer" ? t.editData : t.addCustomer}
                                </h3>
                                <p className="text-maroon-400 text-xs">{t.enterDetails}</p>
                            </div>
                          </div>
                          <button 
                            onClick={closeModals}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <X className="w-4 h-4 text-maroon-400" />
                          </button>
                        </div>

                        <form 
                          className="space-y-4" 
                          onSubmit={
                            activeForm === "price" ? handleAddPrice :
                            activeForm === "compatibility" ? handleAddCompatibility :
                            activeForm === "customer" ? handleAddCustomer : 
                            activeForm === "edit_customer" ? handleEditCustomer :
                            activeForm === "product" ? handleAddProduct : 
                            activeForm === "edit_product" ? handleEditProduct : 
                            handleAddFolder
                          }
                        >
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-maroon-300 ml-1">
                              {activeForm === "compatibility" ? t.deviceName :
                               activeForm === "price" ? t.productName :
                               activeForm?.includes("product") ? t.productName : 
                               activeForm === "folder" ? t.folderName : t.customerName}
                            </label>
                            <input 
                              type="text" 
                              required
                              value={
                                activeForm === "compatibility" ? compDeviceName :
                                activeForm === "price" ? pricePartName : 
                                activeForm?.includes("customer") ? custName : 
                                activeForm?.includes("product") ? prodName : folderName
                              }
                              onChange={(e) => {
                                if (activeForm === "compatibility") setCompDeviceName(e.target.value);
                                else if (activeForm === "price") setPricePartName(e.target.value);
                                else if (activeForm?.includes("customer")) setCustName(e.target.value);
                                else if (activeForm?.includes("product")) setProdName(e.target.value);
                                else setFolderName(e.target.value);
                              }}
                              placeholder={
                                activeForm === "compatibility" ? t.placeholderDevice :
                                activeForm === "price" ? t.placeholderProduct :
                                activeForm?.includes("product") ? t.placeholderProduct : 
                                activeForm === "folder" ? t.placeholderFolder : t.placeholderCustomer
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50"
                            />
                          </div>

                          {activeForm === "compatibility" && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-maroon-300 ml-1">{t.brandType}</label>
                              <select 
                                required
                                value={prodBrand}
                                onChange={(e) => setProdBrand(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50 appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-maroon-950">...</option>
                                {MOBILE_BRANDS.map((brand) => (
                                  <option key={brand} value={brand} className="bg-maroon-950">
                                    {brand}
                                  </option>
                                ))}
                                <option value="Other" className="bg-maroon-950">{lang === 'ar' ? 'أخرى' : 'Other'}</option>
                              </select>
                            </div>
                          )}

                          {activeForm === "compatibility" && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-maroon-300 ml-1">{t.compatibleDevices}</label>
                              <textarea 
                                required
                                rows={4}
                                value={compDevicesList}
                                onChange={(e) => setCompDevicesList(e.target.value)}
                                placeholder="iPhone 11\niPhone XR\n..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-xs text-maroon-50 resize-none"
                              />
                            </div>
                          )}

                          {activeForm === "price" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <label className="text-xs font-medium text-maroon-300 ml-1">{t.priceType}</label>
                                <select 
                                  required
                                  value={pricePartCategory}
                                  onChange={(e) => setPricePartCategory(e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50 appearance-none cursor-pointer"
                                >
                                  <option value="" disabled className="bg-maroon-950">...</option>
                                  {CATEGORIES.filter(c => c.id !== "prices" && c.id !== "maintenance" && c.id !== "all_inventory").map(cat => (
                                    <option key={cat.id} value={cat.id} className="bg-maroon-950">{t[cat.nameKey as keyof typeof t]}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-medium text-maroon-300 ml-1">{t.priceValue}</label>
                                <input 
                                  type="text" 
                                  required
                                  value={priceAmount}
                                  onChange={(e) => setPriceAmount(e.target.value)}
                                  placeholder="25,000"
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50"
                                />
                              </div>
                            </div>
                          )}

                          {activeForm?.includes("product") && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-maroon-300 ml-1">{t.category}</label>
                              <select 
                                required
                                value={prodCategory}
                                onChange={(e) => setProdCategory(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50 appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-maroon-950">...</option>
                                {CATEGORIES.map(cat => (
                                  <option key={cat.id} value={cat.id} className="bg-maroon-950">{t[cat.nameKey as keyof typeof t]}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          {(activeForm?.includes("product") || activeForm?.includes("customer")) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <label className="text-xs font-medium text-maroon-300 ml-1">
                                  {activeForm?.includes("product") ? t.quantity : t.deviceType}
                                </label>
                                <input 
                                  type={activeForm?.includes("product") ? "number" : "text"} 
                                  required
                                  value={activeForm?.includes("customer") ? custDevice : prodQty}
                                  onChange={(e) => activeForm?.includes("customer") ? setCustDevice(e.target.value) : setProdQty(e.target.value)}
                                  placeholder={activeForm?.includes("product") ? t.placeholderQty : t.placeholderDevice}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-medium text-maroon-300 ml-1">
                                  {activeForm?.includes("product") ? (prodCategory === "connectors" ? t.trackCount : t.brandType) : t.cost}
                                </label>
                                {activeForm?.includes("product") ? (
                                  <div className="relative">
                                    <input 
                                      type="text" 
                                      required
                                      value={prodBrand}
                                      onChange={(e) => setProdBrand(e.target.value)}
                                      placeholder={prodCategory === "connectors" ? (lang === 'ar' ? "مثال: 20مسار" : "Ex: 20 tracks") : t.placeholderBrand}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50"
                                      list="brand-suggestions"
                                    />
                                    <datalist id="brand-suggestions">
                                      {MOBILE_BRANDS.map(brand => <option key={brand} value={brand} />)}
                                      {Array.from(new Set(folders.map(f => f.name))).map(name => <option key={name} value={name} />)}
                                    </datalist>
                                  </div>
                                ) : (
                                  <input 
                                    type="text" 
                                    required
                                    value={custCost}
                                    onChange={(e) => setCustCost(e.target.value)}
                                    placeholder={t.placeholderCost}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50"
                                  />
                                )}
                              </div>
                            </div>
                          )}

                          {activeForm?.includes("product") && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-maroon-300 ml-1">{t.location}</label>
                              <input 
                                type="text" 
                                required
                                value={prodLoc}
                                onChange={(e) => setProdLoc(e.target.value)}
                                placeholder={t.placeholderLoc}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50"
                              />
                            </div>
                          )}

                          {activeForm?.includes("customer") && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-maroon-300 ml-1">{t.issue}</label>
                              <textarea 
                                required
                                value={custIssue}
                                onChange={(e) => setCustIssue(e.target.value)}
                                placeholder={t.placeholderIssue}
                                rows={2}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-rose-500/50 transition-all text-xs text-maroon-50 resize-none"
                              />
                            </div>
                          )}

                          <div className="flex gap-3 pt-2">
                            {activeForm === "customer" ? (
                              <>
                                <button 
                                  type="submit"
                                  className="flex-1 bg-rose-600 hover:bg-rose-500 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-rose-900/40 text-sm flex items-center justify-center gap-2"
                                >
                                  {t.save}
                                </button>
                                <button 
                                  type="button"
                                  disabled={isPrinting}
                                  onClick={handleAddAndPrint}
                                  className="flex-1 bg-maroon-800 hover:bg-maroon-700 py-3 rounded-xl font-bold transition-colors border border-white/10 text-sm flex items-center justify-center gap-2"
                                >
                                  {isPrinting ? t.connecting : (
                                    <>
                                      <Printer size={14} />
                                      {t.print}
                                    </>
                                  )}
                                </button>
                              </>
                            ) : (
                              <button 
                                type="submit"
                                className="flex-1 bg-rose-600 hover:bg-rose-500 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-rose-900/40 text-sm"
                              >
                                {activeForm?.includes("edit") ? t.save : t.save}
                              </button>
                            )}
                            <button 
                              type="button"
                              onClick={closeModals}
                              className="w-20 bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold transition-colors text-sm"
                            >
                              {t.cancel}
                            </button>
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Main Content Area (Items or Grid) */}
              {selectedCategory && (
                <div className="glass rounded-[2rem] p-4 min-h-[300px] border-dashed border-maroon-800/50">
                  {selectedCategory === "all_inventory" ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-3">
                        {filteredInventory.length > 0 ? (
                          filteredInventory.map(product => (
                            <div key={product.id} className="glass-dark p-4 rounded-xl flex items-center justify-between gap-4 group hover:bg-white/5 transition-all border border-white/5">
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${product.quantity < 3 ? 'bg-amber-500/10 text-amber-500' : 'bg-maroon-900/40 text-rose-400'} overflow-hidden`}>
                                  {product.image ? (
                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    product.category === 'screens' ? <Smartphone size={16} /> : <Zap size={16} />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-bold text-white">{product.name}</div>
                                    {product.quantity < 3 && (
                                      <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-lg border border-amber-500/20 uppercase font-bold">
                                        {lang === 'ar' ? 'مخزون منخفض' : 'Low Stock'}
                                      </span>
                                    )}
                                    {product.price && (
                                      <span className="text-[10px] text-emerald-400 font-bold">
                                        {product.price} {t.iqd}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-maroon-400 mt-0.5 font-medium">
                                    <span className="text-rose-400/80">{product.brand}</span>
                                    <span className="mx-1.5 opacity-30">|</span>
                                    <span>{t.location}: {product.loc}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end">
                                <div className="text-[9px] text-maroon-500 uppercase font-bold tracking-widest mb-1 opacity-60">
                                  {t.quantity}
                                </div>
                                <div className={`text-xl font-bold ${product.quantity < 3 ? 'text-amber-500' : 'text-rose-400'}`}>
                                  {product.quantity}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-12 text-center">
                            <div className="inline-flex p-4 bg-white/5 rounded-2xl mb-4">
                              <Search className="w-8 h-8 text-maroon-700" />
                            </div>
                            <h4 className="text-sm font-bold text-maroon-300">
                              {inventorySearch ? (lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No results found') : t.emptyInventory}
                            </h4>
                            <p className="text-[10px] text-maroon-500 max-w-xs mx-auto mt-2">
                              {inventorySearch 
                                ? (lang === 'ar' ? `لم نجد أي تطابق لـ "${inventorySearch}"` : `We couldn't find any match for "${inventorySearch}"`)
                                : t.emptyInventoryDesc}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : selectedCategory === "prices" ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredPriceRecords.map(price => (
                          <motion.div 
                            key={price.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-dark p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-all group flex flex-col justify-between"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="text-[10px] text-rose-400 font-bold uppercase mb-1">
                                  {CATEGORIES.find(c => c.id === price.category) ? (
                                    t[CATEGORIES.find(c => c.id === price.category)!.nameKey as keyof typeof t]
                                  ) : price.category}
                                </div>
                                <h4 className="text-sm font-bold text-white mb-2">{price.name}</h4>
                              </div>
                              <button 
                                onClick={() => deletePrice(price.id)}
                                className="p-1.5 text-maroon-700 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                              <span className="text-[10px] text-maroon-500 font-medium">{lang === 'ar' ? 'السعر المقدر' : 'Estimated Price'}</span>
                              <div className="bg-rose-500/10 px-3 py-1 rounded-lg">
                                <span className="text-rose-400 font-bold text-sm tracking-wide">{price.price}</span>
                                <span className="text-[10px] text-rose-500 font-bold mr-1">{t.iqd}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {filteredPriceRecords.length === 0 && (
                          <div className="col-span-full py-12 text-center">
                            <div className="inline-flex p-4 bg-white/5 rounded-2xl mb-4">
                              <CreditCard className="w-8 h-8 text-maroon-700" />
                            </div>
                            <h4 className="text-sm font-bold text-maroon-300">
                              {inventorySearch ? (lang === 'ar' ? 'لا توجد نتائج تتطابق مع بحثك' : 'No results match your search') : t.noRecords}
                            </h4>
                            <p className="text-[10px] text-maroon-500">
                              {inventorySearch 
                                ? (lang === 'ar' ? 'جرب البحث بكلمات أخرى أو تحقق من القسم' : 'Try searching for different terms or check the category')
                                : (lang === 'ar' ? 'أضف أسعار القطع الشائعة لتسهيل العمل' : 'Add common part prices to simplify work')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    ) : selectedCategory === "compatibility" ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredCompatibility.map(comp => {
                          const isExpanded = expandedCompatibilityId === comp.id;
                          return (
                            <motion.div 
                              key={comp.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              onClick={() => setExpandedCompatibilityId(isExpanded ? null : comp.id)}
                              className="glass-dark p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden cursor-pointer"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                                    <Smartphone size={18} />
                                  </div>
                                  <h4 className="text-lg font-bold text-white">{comp.deviceName}</h4>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteCompatibility(comp.id);
                                    }}
                                    className="p-1.5 text-maroon-700 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    <X size={16} />
                                  </button>
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    className="text-maroon-500 group-hover:text-blue-400 transition-colors"
                                  >
                                    <ChevronDown size={18} />
                                  </motion.div>
                                </div>
                              </div>
                              
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-2 text-[10px] text-maroon-400 font-medium pb-2 border-b border-white/5 uppercase tracking-wider">
                                        <span className="opacity-50">{lang === 'ar' ? 'الماركة:' : 'Brand:'}</span>
                                        <span className="text-blue-400 font-bold">{comp.brand}</span>
                                      </div>

                                      <div className="space-y-2">
                                        <div className="text-[10px] text-maroon-500 font-bold uppercase tracking-wider mb-2 opacity-60">
                                          {t.compatibleDevices}
                                        </div>
                                      <div className="space-y-1.5">
                                        {comp.compatibleItems.map((item: string, idx: number) => {
                                          const isHighlighted = (searchQuery || inventorySearch) && item.toLowerCase().includes((searchQuery || inventorySearch).toLowerCase());
                                          return (
                                            <div 
                                              key={idx} 
                                              className={`flex items-center gap-3 text-sm group/item ${isHighlighted ? 'text-blue-300' : 'text-maroon-100'}`}
                                            >
                                              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold border transition-all ${isHighlighted ? 'bg-blue-500 text-white border-blue-400' : 'bg-white/5 text-blue-400 border-white/5 group-hover/item:bg-blue-500 group-hover/item:text-white'}`}>
                                                {idx + 1}
                                              </span>
                                              <span className="font-medium">{item}</span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                                )}
                              </AnimatePresence>
                              
                              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            </motion.div>
                          );
                        })}
                        {filteredCompatibility.length === 0 && (
                          <div className="col-span-full py-12 text-center">
                            <div className="inline-flex p-4 bg-white/5 rounded-2xl mb-4">
                              <Repeat className="w-8 h-8 text-maroon-700" />
                            </div>
                            <h4 className="text-sm font-bold text-maroon-300">{t.noRecords}</h4>
                            <p className="text-[10px] text-maroon-500">{lang === 'ar' ? 'سجل توافق القطع بين الأجهزة المختلفة هنا' : 'Log part compatibility between different devices here'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : selectedCategory === "maintenance" ? (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                          {[
                            { id: 'all', label: t.all, count: maintenanceRecords.length },
                            { id: 'pending', label: t.pending, count: maintenanceRecords.filter(r => !r.isReady).length, color: 'text-rose-400 bg-rose-400/10' },
                            { id: 'ready', label: t.filterReady, count: maintenanceRecords.filter(r => r.isReady).length, color: 'text-emerald-400 bg-emerald-400/10' }
                          ].map(filter => (
                            <button
                              key={filter.id}
                              onClick={() => setMaintenanceFilter(filter.id as any)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                                maintenanceFilter === filter.id 
                                ? 'bg-rose-600 text-white border-rose-600' 
                                : `glass border-white/5 hover:bg-white/10 ${filter.color || 'text-maroon-300'}`
                              }`}
                            >
                              {filter.label}
                              <span className={`px-1.5 py-0.5 rounded-lg text-[10px] ${maintenanceFilter === filter.id ? 'bg-white/20' : 'bg-black/20'}`}>
                                {filter.count}
                              </span>
                            </button>
                          ))}
                        </div>
                        <button 
                          onClick={() => setActiveForm("customer")}
                          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-all shadow-lg shadow-rose-900/40 flex items-center gap-2 text-sm"
                        >
                          <Plus className="w-5 h-5" />
                          <span>{t.addCustomer}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {maintenanceRecords.length > 0 ? (
                          maintenanceRecords
                            .filter(r => {
                              if (maintenanceFilter === 'pending') return !r.isReady;
                              if (maintenanceFilter === 'ready') return r.isReady;
                              return true;
                            })
                            .filter(r => {
                              const term = (searchQuery || maintenanceSearchQuery).toLowerCase();
                              return r.customerName.toLowerCase().includes(term) ||
                                     r.deviceType.toLowerCase().includes(term);
                            })
                            .map(rec => (
                            <motion.div 
                              key={rec.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="glass-dark p-4 rounded-[1.5rem] border border-white/10 relative overflow-hidden group"
                            >
                              <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                  <h4 className="text-lg font-bold text-maroon-50 mb-0.5">{rec.customerName}</h4>
                                  <div className="flex items-center gap-3 text-maroon-300">
                                    <span className="text-xs bg-white/5 px-2 py-1 rounded-lg border border-white/5">{rec.deviceType}</span>
                                    <span className="text-xs text-rose-400 font-bold">{rec.cost} {lang === 'ar' ? 'د.ع' : 'IQD'}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => handlePrintRecord(rec)}
                                    className="p-2 bg-white/5 hover:bg-emerald-500/20 text-maroon-500 hover:text-emerald-400 rounded-lg transition-all"
                                    title={t.print}
                                  >
                                    <Printer size={14} />
                                  </button>
                                  <button 
                                    onClick={() => deleteRecord(rec.id)}
                                    className="p-2 bg-white/5 hover:bg-rose-500/20 text-maroon-500 hover:text-rose-500 rounded-lg transition-all"
                                    title="Delete Card"
                                  >
                                    <X size={14} />
                                  </button>
                                  <div 
                                    onClick={() => toggleReady(rec.id)}
                                    className="flex items-center gap-2 cursor-pointer group/status"
                                  >
                                    <div className={`w-4 h-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-300 ${rec.isReady ? 'bg-emerald-500 shadow-emerald-500/50 scale-125' : 'bg-rose-600 shadow-rose-600/50'}`} />
                                    <span className={`text-[10px] font-bold ${rec.isReady ? 'text-emerald-400' : 'text-rose-400'}`}>
                                      {rec.isReady ? t.ready : t.inProgress}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="p-3 bg-maroon-950/40 rounded-xl mb-3 text-sm text-maroon-200 border border-white/5 group-hover:bg-maroon-900/20 transition-colors">
                                <span className="text-maroon-500 block text-[10px] mb-1 font-bold uppercase tracking-wider">{t.issue}</span>
                                {rec.issue}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 mt-4 text-[10px] text-maroon-400 font-medium">
                                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                                  <Clock size={10} />
                                  <span>{t.entryDate}: {rec.entryDate}</span>
                                </div>
                                {rec.readyDate && (
                                  <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
                                    <CheckCircle2 size={10} />
                                    <span>{t.readyDate}: {rec.readyDate}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center gap-2">
                                  {rec.isReady ? (
                                    <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                                      <CheckCircle2 size={14} />
                                      <span>{t.readyToDeliver}</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1.5 text-rose-400 text-sm font-bold bg-rose-400/10 px-3 py-1.5 rounded-full border border-rose-400/20">
                                      <Clock size={14} />
                                      <span>{t.underMaintenance}</span>
                                    </div>
                                  )}
                                </div>
                                <button 
                                  onClick={() => startEditCustomer(rec)}
                                  className="text-xs text-maroon-500 hover:text-maroon-300 transition-colors"
                                >
                                  {t.editData}
                                </button>
                              </div>
                              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-5 transition-opacity ${rec.isReady ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            </motion.div>
                          ))
                        ) : (
                          <div className="col-span-full py-20 text-center">
                            <div className="inline-flex p-6 bg-white/5 rounded-full mb-4">
                              <UserCheck className="w-10 h-10 text-maroon-700" />
                            </div>
                            <h4 className="text-xl font-bold text-maroon-300">{t.noRecords}</h4>
                            <p className="text-maroon-500 max-w-xs mx-auto mt-2">{t.noRecordsDesc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {!selectedFolder && !["all_inventory", "maintenance", "prices", "compatibility"].includes(selectedCategory) && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-1 bg-maroon-600 rounded-full" />
                          <h2 className="text-[10px] font-bold text-maroon-300 uppercase tracking-widest">
                            {lang === 'ar' ? 'منتجات إضافية (بدون مجلد)' : 'Additional Items (Unassigned)'}
                          </h2>
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-3">
                        {(() => {
                          const displayed = products
                            .filter(p => {
                              if (p.category !== selectedCategory) return false;
                              
                              if (selectedFolder === "all_items_fallback") return true;

                              const isSpecialCategory = ["all_inventory", "maintenance", "prices", "compatibility"].includes(selectedCategory);

                              if (selectedFolder) {
                                const pBrand = (p.brand || "").toLowerCase();
                                if (pBrand !== selectedFolder.toLowerCase()) return false;
                              } else if (!isSpecialCategory) {
                                // NO FOLDER SELECTED in standard category: Show ONLY UNASSIGNED products
                                const currentCategoryFolders = folders.filter(f => f.categoryId === selectedCategory);
                                const folderNames = currentCategoryFolders.map(f => f.name.toLowerCase());
                                const pBrand = (p.brand || "").toLowerCase();
                                if (folderNames.includes(pBrand)) return false;
                              }
                              
                              const term = (searchQuery || inventorySearch).toLowerCase();
                              if (term) {
                                return (
                                  p.name.toLowerCase().includes(term) || 
                                  p.brand.toLowerCase().includes(term) ||
                                  p.loc?.toLowerCase().includes(term)
                                );
                              }
                              return true;
                            })
                            .sort((a, b) => {
                              if (sortBy === 'name') return a.name.localeCompare(b.name);
                              if (sortBy === 'quantity') return b.quantity - a.quantity;
                              if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
                              return 0;
                            });

                          return displayed.length > 0 ? (
                            displayed.map(product => (
                              <div key={product.id} className="glass-dark p-2 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-1 group hover:bg-white/5 transition-all max-h-32 overflow-hidden">
                                <div className="flex items-center gap-2">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${product.quantity < 3 ? 'bg-amber-500/20 text-amber-500' : 'bg-maroon-900/40 text-rose-400'}`}>
                                    {(() => {
                                      const Icon = CATEGORIES.find(c => c.id === product.category)?.icon || Package;
                                      return <Icon size={14} />;
                                    })()}
                                  </div>
                                  <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <div 
                                className="flex items-center gap-1 text-[11px] font-bold transition-all bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
                              >
                                {product.name}
                              </div>
                              {product.quantity < 3 && (
                                <span className="text-[7px] bg-amber-500/10 text-amber-500 px-1 py-0.5 rounded border border-amber-500/20">
                                  {lang === 'ar' ? 'منخفض' : 'Low'}
                                </span>
                              )}
                              {product.price && (
                                <div 
                                  className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded ml-1 transition-all border border-emerald-500/10"
                                >
                                  {product.price} {t.iqd}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div 
                                className="flex items-center gap-1 text-[9px] text-maroon-400 transition-all bg-white/5 px-1.5 rounded"
                              >
                                {product.brand} - {t.location}: {product.loc}
                              </div>
                                      {product.image && (
                                        <a href={product.image} target="_blank" rel="noreferrer" className="text-[8px] text-blue-400 hover:underline flex items-center gap-0.5">
                                          <Camera size={8} />
                                          {t.viewImage}
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4">
                                  <div className="flex items-center gap-1.5 bg-white/5 p-0.5 rounded-lg">
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => withdrawProduct(product.id)}
                                      disabled={product.quantity <= 0}
                                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors text-xs ${product.quantity > 0 ? 'hover:bg-rose-600/20 text-rose-400' : 'text-maroon-700 cursor-not-allowed'}`}
                                    >
                                      -
                                    </motion.button>
                                    <div className={`w-6 text-center text-xs font-bold ${product.quantity < 3 ? 'text-amber-500' : 'text-rose-400'}`}>
                                      {product.quantity}
                                    </div>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => incrementProduct(product.id)}
                                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-emerald-600/20 text-emerald-400 transition-colors text-xs"
                                    >
                                      +
                                    </motion.button>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button 
                                      onClick={() => startEditProduct(product)}
                                      className="p-1 text-maroon-700 hover:text-emerald-500 transition-colors"
                                    >
                                      <Settings size={12} />
                                    </button>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      disabled={product.quantity <= 0}
                                      onClick={() => {
                                        withdrawProduct(product.id);
                                      }}
                                      className={`px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                                        product.quantity > 0 
                                        ? 'bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white ring-px ring-rose-500/20' 
                                        : 'bg-maroon-900/40 text-maroon-600 cursor-not-allowed'
                                      }`}
                                    >
                                      <History size={10} />
                                      {t.withdrawPiece}
                                    </motion.button>
                                    <button 
                                      onClick={() => {
                                        if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه القطعة؟' : 'Are you sure you want to delete this piece?')) {
                                          deleteProduct(product.id);
                                          showToast(lang === 'ar' ? 'تم حذف القطعة' : 'Product deleted', 'error');
                                        }
                                      }}
                                      className="p-1 text-maroon-700 hover:text-rose-500 transition-colors"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-6 text-center">
                              <div className="inline-flex p-3 bg-white/5 rounded-full mb-2">
                                {(() => {
                                  const Icon = CATEGORIES.find(c => c.id === selectedCategory)?.icon || Package;
                                  return <Icon className="w-8 h-8 text-maroon-700" />;
                                })()}
                              </div>
                              <h4 className="text-sm font-bold text-maroon-300">{t.emptyInventory}</h4>
                              <p className="text-[10px] text-maroon-500 max-w-xs mx-auto mt-1">
                                {lang === 'ar' ? `لا توجد أي قطع مضافة حاليا.` : `No parts added yet.`}
                              </p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Notifications Sidebar */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationsOpen(false)}
              className="fixed inset-0 bg-maroon-950/60 backdrop-blur-md z-[150]"
            />
            <motion.div 
              initial={{ x: lang === 'ar' ? -400 : 400 }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? -400 : 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 ${lang === 'ar' ? 'left-0' : 'right-0'} w-full md:w-80 glass shadow-2xl z-[160] overflow-hidden flex flex-col border-white/10`}
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-rose-600 rounded-lg">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-bold">{t.activityLog}</h3>
                </div>
                <button 
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {activities.length > 0 ? (
                  activities.map((activity: any) => (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-dark p-2.5 rounded-lg relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        activity.type === 'add' ? 'bg-emerald-500' : 
                        activity.type === 'withdraw' ? 'bg-rose-500' : 'bg-amber-500'
                      }`} />
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[7px] uppercase font-bold text-maroon-500 tracking-wider">
                          {activity.time} • {activity.date}
                        </span>
                      </div>
                      <h4 className={`font-bold text-xs mb-0.5 ${
                        activity.type === 'alert' ? 'text-amber-400 flex items-center gap-1.5' : ''
                      }`}>
                        {activity.type === 'alert' && <AlertCircle size={10} />}
                        {activity.title}
                      </h4>
                      <p className="text-[10px] text-maroon-300 leading-tight">{activity.desc}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                    <Bell className="w-8 h-8 mb-2" />
                    <p className="font-bold text-xs">{t.noNotifications}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer / Status Bar */}
      <footer className="mt-8 border-t border-maroon-900/30 pt-4 pb-2 text-center">
        <p className="text-maroon-500 text-[10px] font-light italic">
          {lang === 'ar' ? 'تم انشاء التطبيق بواسطه الدكتور حمد' : 'App created by Dr. Hamad'}
        </p>
      </footer>
    </div>
    </>
  );
}
