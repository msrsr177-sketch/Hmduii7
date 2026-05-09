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
  ArrowUpRight
} from "lucide-react";
import { useState, useMemo, FormEvent, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

type Language = 'ar' | 'en';

const translations = {
  ar: {
    title: "نيو فون قسم الصيانه",
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
    viewFolderContents: "عرض محتويات المجلد",
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
    speakers: "سماعات",
    cameras: "كاميرات",
    sim: "شرايح",
    powerFinger: "بصمة + زر باور",
    antennas: "هوائيات",
    cpu: "معالج",
    motherboard: "مذربورد",
    connectors: "كونكتر",
    chargingBase: "قاعدة شحن",
    others: "شركات أخرى"
  },
  en: {
    title: "New Phone Maintenance",
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
    viewFolderContents: "View Folder Contents",
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
    others: "Other Companies"
  }
};

// Category Icons and Config
const CATEGORIES = [
  { id: "screens", nameKey: "screens", icon: Smartphone, count: 0, color: "from-rose-500 to-maroon-600" },
  { id: "batteries", nameKey: "batteries", icon: Battery, count: 0, color: "from-emerald-500 to-maroon-600" },
  { id: "charging-flex", nameKey: "chargingFlex", icon: Zap, count: 0, color: "from-amber-500 to-maroon-600" },
  { id: "disassembled", nameKey: "disassembled", icon: Hammer, count: 0, color: "from-blue-600 to-maroon-600" },
  { id: "speakers", nameKey: "speakers", icon: Headphones, count: 0, color: "from-purple-500 to-maroon-600" },
  { id: "cameras", nameKey: "cameras", icon: Camera, count: 0, color: "from-cyan-500 to-maroon-600" },
  { id: "sim", nameKey: "sim", icon: CreditCard, count: 0, color: "from-orange-500 to-maroon-600" },
  { id: "power_finger", nameKey: "powerFinger", icon: Fingerprint, count: 0, color: "from-pink-500 to-maroon-600" },
  { id: "antennas", nameKey: "antennas", icon: Radio, count: 0, color: "from-lime-500 to-maroon-600" },
  { id: "cpu", nameKey: "cpu", icon: Cpu, count: 0, color: "from-violet-600 to-maroon-600" },
  { id: "motherboard", nameKey: "motherboard", icon: CircuitBoard, count: 0, color: "from-gray-400 to-maroon-600" },
  { id: "connectors", nameKey: "connectors", icon: Cable, count: 0, color: "from-indigo-500 to-maroon-600" },
  { id: "charging-base", nameKey: "chargingBase", icon: Plug2, count: 0, color: "from-teal-500 to-maroon-600" },
];

const COMPANIES = [
  { id: "tecno", name: "Tecno", count: 0 },
  { id: "iphone", name: "iPhone", count: 0 },
  { id: "samsung", name: "Samsung", count: 0 },
  { id: "xiaomi", name: "Xiaomi", count: 0 },
  { id: "huawei", name: "Huawei", count: 0 },
  { id: "infinix", name: "Infinix", count: 0 },
  { id: "others", name: "Others", nameKey: "others", count: 0 },
];

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'ar';
  });
  const t = translations[lang];

  const [products, setProducts] = useState<any[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });
  const [folders, setFolders] = useState<any[]>(() => {
    const saved = localStorage.getItem('folders');
    return saved ? JSON.parse(saved) : COMPANIES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"product" | "folder" | "customer" | "edit_product" | "edit_customer" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maintenanceSearchQuery, setMaintenanceSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'quantity' | 'brand'>('name');

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

  const [folderName, setFolderName] = useState("");

  const [maintenanceRecords, setMaintenanceRecords] = useState<any[]>(() => {
    const saved = localStorage.getItem('maintenance_records');
    return saved ? JSON.parse(saved) : [];
  });
  const [withdrawalCount, setWithdrawalCount] = useState(() => {
    const saved = localStorage.getItem('withdrawal_count');
    return saved ? parseInt(saved) : 0;
  });
  const [maintenanceFilter, setMaintenanceFilter] = useState<'all' | 'pending' | 'ready'>('all');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('maintenance_records', JSON.stringify(maintenanceRecords));
  }, [maintenanceRecords]);

  useEffect(() => {
    localStorage.setItem('withdrawal_count', withdrawalCount.toString());
  }, [withdrawalCount]);

  const toggleReady = (id: number) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMaintenanceRecords(prev => prev.map(rec => 
      rec.id === id ? { 
        ...rec, 
        isReady: !rec.isReady,
        readyDate: !rec.isReady ? formattedDate : null
      } : rec
    ));
  };

  const withdrawProduct = (id: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, quantity: Math.max(0, p.quantity - 1) };
      }
      return p;
    }));
    setWithdrawalCount(prev => prev + 1);
  };

  const incrementProduct = (id: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    ));
  };

  const deleteProduct = (id: number) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه القطعة؟' : 'Are you sure you want to delete this piece?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const deleteRecord = (id: number) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه البطاقة؟' : 'Are you sure you want to delete this card?')) {
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
    setProdBrand("");
    setProdCategory(selectedCategory && selectedCategory !== "maintenance" && selectedCategory !== "all_inventory" ? selectedCategory : "");
    setFolderName("");
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
    setProducts(prev => prev.map(p => 
      p.id === editingId ? {
        ...p,
        name: prodName,
        quantity: parseInt(prodQty) || 0,
        loc: prodLoc,
        brand: prodBrand,
        category: prodCategory
      } : p
    ));
    closeModals();
  };

  const handleEditCustomer = (e: FormEvent) => {
    e.preventDefault();
    setMaintenanceRecords(prev => prev.map(r => 
      r.id === editingId ? {
        ...r,
        customerName: custName,
        deviceType: custDevice,
        issue: custIssue,
        cost: custCost
      } : r
    ));
    closeModals();
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: prodName,
      quantity: parseInt(prodQty) || 0,
      loc: prodLoc,
      brand: prodBrand || "Others",
      category: prodCategory || (selectedCategory && selectedCategory !== "all_inventory" && selectedCategory !== "maintenance" ? selectedCategory : "screens")
    };
    setProducts(prev => [newProduct, ...prev]);
    closeModals();
  };

  const handleAddFolder = (e: FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    const newFolder = {
      id: folderName.toLowerCase().replace(/\s+/g, '-'),
      name: folderName,
      count: 0
    };
    setFolders(prev => [...prev, newFolder]);
    closeModals();
  };

  const handleAddCustomer = (e: FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newRecord = {
      id: Date.now(),
      customerName: custName,
      deviceType: custDevice,
      issue: custIssue,
      cost: custCost,
      isReady: false,
      entryDate: formattedDate,
      readyDate: null
    };

    setMaintenanceRecords(prev => [newRecord, ...prev]);
    closeModals();
  };

  return (
    <div className={`min-h-screen bg-maroon-950 text-maroon-50 font-sans p-4 md:p-8 relative selection:bg-rose-500/30 ${lang === 'en' ? 'font-sans' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Dynamic background blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-maroon-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 relative z-[100]">
          <motion.div 
            initial={{ x: lang === 'ar' ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-1 flex items-center gap-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-l from-maroon-100 to-rose-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="glass-dark px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/10 transition-all text-rose-400 flex items-center gap-2"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>
          </motion.div>

          <div className="relative w-full md:w-96 group">
            <motion.div 
              initial={{ x: lang === 'ar' ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`glass-dark px-6 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-rose-500/50 bg-maroon-900/60' : ''}`}
            >
              <Search className={`w-5 h-5 transition-colors ${isSearchFocused ? 'text-rose-400' : 'text-maroon-400'}`} />
              <input 
                type="text" 
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder} 
                className="bg-transparent border-none outline-none text-maroon-100 placeholder:text-maroon-500/50 w-full"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="hover:text-rose-400 transition-colors">
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
                  className="absolute top-full left-0 right-0 mt-3 glass rounded-2xl overflow-hidden shadow-2xl border-white/10 z-[110] max-h-[400px] overflow-y-auto custom-scrollbar"
                >
                  {filteredResults.length > 0 ? (
                    <div className="p-2 space-y-1">
                      <div className="px-4 py-2 text-xs font-bold text-maroon-400 uppercase tracking-widest border-b border-white/5 mb-1">
                        نتائج البحث ({filteredResults.length})
                      </div>
                      {filteredResults.map((product) => (
                        <div
                          key={product.id}
                          className="w-full text-right px-4 py-3 rounded-xl hover:bg-white/5 flex items-center justify-between group transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${product.quantity < 3 ? 'bg-amber-500/20 text-amber-500' : 'bg-rose-500/20 text-rose-400'}`}>
                              {product.category === 'screens' ? <Smartphone size={18} /> : <Zap size={18} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="font-bold text-maroon-50">{product.name}</div>
                                {product.quantity < 3 && (
                                  <span className="text-[8px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded-md font-bold uppercase ring-1 ring-amber-500/30">
                                    {lang === 'ar' ? 'مخزون منخفض' : 'Low Stock'}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-maroon-400 flex gap-2">
                                <span className={product.quantity < 3 ? 'text-amber-500' : ''}>{t.quantity}: {product.quantity}</span>
                                <span>•</span>
                                <span>{t.location}: {product.loc}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => startEditProduct(product)}
                              className="p-2 text-maroon-700 hover:text-emerald-500 transition-colors"
                            >
                              <Settings size={16} />
                            </button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={product.quantity <= 0}
                              onClick={() => withdrawProduct(product.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                product.quantity > 0 
                                ? 'bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white' 
                                : 'bg-maroon-900/40 text-maroon-600 cursor-not-allowed'
                              }`}
                            >
                              <History size={14} />
                              {t.withdrawPiece}
                            </motion.button>
                            <ArrowUpRight className="w-4 h-4 text-maroon-600 group-hover:text-rose-400 transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center text-maroon-500">
                      <div className="mb-2 flex justify-center">
                        <Search className="w-8 h-8 opacity-20" />
                      </div>
                      <p>لا توجد نتائج مطابقة لـ "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Global Statistics */}
        {!selectedCategory && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { id: "stats_total", label: t.totalItems, value: products.reduce((acc, p) => acc + p.quantity, 0).toString(), icon: Package, action: () => setSelectedCategory("all_inventory") },
              { id: "stats_active", label: t.itemTypes, value: products.length.toString(), icon: LayoutDashboard, action: () => setSelectedCategory("all_inventory") },
              { id: "stats_history", label: t.withdrawals, value: withdrawalCount.toString(), icon: History },
              { id: "stats_maintenance", label: t.maintenanceStatus, value: maintenanceRecords.filter(r => !r.isReady).length.toString(), icon: Wrench, action: () => setSelectedCategory("maintenance") },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                onClick={stat.action}
                className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:bg-white/15 transition-all cursor-pointer shadow-xl shadow-black/20"
              >
                <stat.icon className="w-5 h-5 mb-2 text-rose-400 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] text-maroon-400 mb-1 uppercase font-bold">{stat.label}</div>
                <div className="text-xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Main Content */}
        <main>
          {!selectedCategory ? (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-8 w-1.5 bg-rose-600 rounded-full" />
                <h2 className="text-2xl font-bold">{t.mainCategories}</h2>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {CATEGORIES.map((cat) => {
                  const catCount = products.filter(p => p.category === cat.id).reduce((acc, p) => acc + p.quantity, 0);
                  return (
                    <motion.div
                      key={cat.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="group cursor-pointer relative overflow-hidden"
                    >
                      <div className="glass rounded-[1.8rem] p-5 h-full flex flex-col items-center justify-center relative z-10 text-center transition-all bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} shadow-lg shadow-maroon-900/40 mb-3 group-hover:rotate-6 transition-transform`}>
                          <cat.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-sm md:text-base font-bold mb-1 group-hover:text-rose-300 transition-colors line-clamp-1">{t[cat.nameKey as keyof typeof t]}</h3>
                        <div className="flex items-center gap-1.5 text-[10px] text-maroon-400 font-bold uppercase">
                          <span className="text-rose-400">{catCount}</span>
                          <span>{t.piece}</span>
                        </div>
                      </div>
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => {
                    if (selectedFolder) {
                      setSelectedFolder(null);
                    } else {
                      setSelectedCategory(null);
                    }
                  }}
                  className="glass-dark px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/5 transition-colors group"
                >
                  {lang === 'ar' ? <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> : <ChevronLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />}
                  <span>{selectedFolder ? t.backToFolders : t.backToCategories}</span>
                </button>
                <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h2 className="text-3xl font-bold">
                    {selectedFolder ? selectedFolder : (CATEGORIES.find(c => c.id === selectedCategory) ? t[CATEGORIES.find(c => c.id === selectedCategory)!.nameKey as keyof typeof t] : "...")}
                  </h2>
                  <p className="text-maroon-400 text-sm">
                    {selectedFolder ? t.viewFolderContents : t.chooseCompany}
                  </p>
                </div>
              </div>

              {/* Sub-Folders View (for Screens) */}
              {selectedCategory === "screens" && !selectedFolder && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {folders.map((company) => {
                    const prodCount = products.filter(p => p.category === "screens" && p.brand?.toLowerCase() === (company.name || "").toLowerCase()).length;
                    return (
                      <motion.div
                        key={company.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFolder(company.name)}
                        className="glass rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer group hover:bg-rose-900/20 transition-all border-rose-900/0 hover:border-rose-500/30"
                      >
                        <div className="p-4 bg-maroon-900/40 rounded-2xl mb-4 group-hover:bg-rose-600 group-hover:text-white transition-all text-rose-500">
                          <Folder className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-lg">{company.nameKey ? t[company.nameKey as keyof typeof t] : company.name}</span>
                        <span className="text-xs text-maroon-500 mt-1">{prodCount} {t.piece}</span>
                      </motion.div>
                    );
                  })}
                  
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveForm("folder")}
                    className="glass border-dashed border-maroon-800 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer group hover:border-rose-500/50 transition-all"
                  >
                    <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover:bg-rose-600/20 transition-all text-maroon-700 group-hover:text-rose-400">
                      <FolderPlus className="w-8 h-8" />
                    </div>
                    <span className="font-medium text-sm text-maroon-500">{t.addFolder}</span>
                  </motion.div>
                </motion.div>
              )}

              {/* Floating Action Button */}
              <div className="fixed bottom-10 left-10 z-50">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAddMenuOpen(true)}
                  className="w-16 h-16 rounded-full bg-rose-600 shadow-xl shadow-rose-950/50 flex items-center justify-center group relative overflow-hidden"
                >
                  <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

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
                      className="fixed bottom-32 left-10 z-[70] flex flex-col gap-3"
                    >
                      <button 
                        onClick={() => setActiveForm("product")}
                        className="glass px-6 py-4 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all text-maroon-100 group"
                      >
                        <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <FilePlus className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg">{t.addProduct}</span>
                      </button>
                      <button 
                        onClick={() => setActiveForm("folder")}
                        className="glass px-6 py-4 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all text-maroon-100 group"
                      >
                        <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                          <FolderPlus className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg">{t.addFolder}</span>
                      </button>
                      <button 
                        onClick={() => setActiveForm("customer")}
                        className="glass px-6 py-4 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all text-maroon-100 group"
                      >
                        <div className="p-2 bg-rose-500/20 rounded-lg group-hover:bg-rose-500 group-hover:text-white transition-colors">
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg">{t.addCustomer}</span>
                      </button>
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
                      className="glass w-full max-w-lg rounded-[2.5rem] overflow-hidden relative"
                    >
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            {activeForm?.includes("product") && (
                              <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                                <FilePlus className="w-6 h-6" />
                              </div>
                            )}
                            {activeForm === "folder" && (
                              <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                                <FolderPlus className="w-6 h-6" />
                              </div>
                            )}
                            {activeForm?.includes("customer") && (
                              <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400">
                                <UserCheck className="w-6 h-6" />
                              </div>
                            )}
                            <div>
                                <h3 className="text-2xl font-bold">
                                  {activeForm === "product" ? t.addProduct : 
                                   activeForm === "edit_product" ? t.editData :
                                   activeForm === "folder" ? t.addFolder : 
                                   activeForm === "edit_customer" ? t.editData : t.addCustomer}
                                </h3>
                                <p className="text-maroon-400 text-sm">{t.enterDetails}</p>
                            </div>
                          </div>
                          <button 
                            onClick={closeModals}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <X className="w-6 h-6 text-maroon-400" />
                          </button>
                        </div>

                        <form 
                          className="space-y-6" 
                          onSubmit={
                            activeForm === "customer" ? handleAddCustomer : 
                            activeForm === "edit_customer" ? handleEditCustomer :
                            activeForm === "product" ? handleAddProduct : 
                            activeForm === "edit_product" ? handleEditProduct : 
                            handleAddFolder
                          }
                        >
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-maroon-300 mr-2">
                              {activeForm?.includes("product") ? t.productName : 
                               activeForm === "folder" ? t.folderName : t.customerName}
                            </label>
                            <input 
                              type="text" 
                              required
                              value={activeForm?.includes("customer") ? custName : activeForm?.includes("product") ? prodName : folderName}
                              onChange={(e) => {
                                if (activeForm?.includes("customer")) setCustName(e.target.value);
                                else if (activeForm?.includes("product")) setProdName(e.target.value);
                                else setFolderName(e.target.value);
                              }}
                              placeholder={activeForm?.includes("product") ? t.placeholderProduct : 
                                         activeForm === "folder" ? t.placeholderFolder : t.placeholderCustomer}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-maroon-50"
                            />
                          </div>

                          {activeForm?.includes("product") && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-maroon-300 mr-2">{t.category}</label>
                              <select 
                                required
                                value={prodCategory}
                                onChange={(e) => setProdCategory(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-maroon-50 appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-maroon-950">...</option>
                                {CATEGORIES.map(cat => (
                                  <option key={cat.id} value={cat.id} className="bg-maroon-950">{t[cat.nameKey as keyof typeof t]}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          {(activeForm?.includes("product") || activeForm?.includes("customer")) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-maroon-300 mr-2">
                                  {activeForm?.includes("product") ? t.quantity : t.deviceType}
                                </label>
                                <input 
                                  type={activeForm?.includes("product") ? "number" : "text"} 
                                  required
                                  value={activeForm?.includes("customer") ? custDevice : prodQty}
                                  onChange={(e) => activeForm?.includes("customer") ? setCustDevice(e.target.value) : setProdQty(e.target.value)}
                                  placeholder={activeForm?.includes("product") ? t.placeholderQty : t.placeholderDevice}
                                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-maroon-50"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-maroon-300 mr-2">
                                  {activeForm?.includes("product") ? t.brand : t.cost}
                                </label>
                                {activeForm?.includes("product") ? (
                                  <select 
                                    required
                                    value={prodBrand}
                                    onChange={(e) => setProdBrand(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-maroon-50 appearance-none cursor-pointer"
                                  >
                                    <option value="" disabled className="bg-maroon-950">...</option>
                                    {folders.map(company => (
                                      <option key={company.id} value={company.name} className="bg-maroon-950">
                                        {company.nameKey ? t[company.nameKey as keyof typeof t] : company.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input 
                                    type="text" 
                                    required
                                    value={custCost}
                                    onChange={(e) => setCustCost(e.target.value)}
                                    placeholder={t.placeholderCost}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-maroon-50"
                                  />
                                )}
                              </div>
                            </div>
                          )}

                          {activeForm?.includes("product") && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-maroon-300 mr-2">{t.location}</label>
                              <input 
                                type="text" 
                                required
                                value={prodLoc}
                                onChange={(e) => setProdLoc(e.target.value)}
                                placeholder={t.placeholderLoc}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-maroon-50"
                              />
                            </div>
                          )}

                          {activeForm?.includes("customer") && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-maroon-300 mr-2">{t.issue}</label>
                              <textarea 
                                required
                                value={custIssue}
                                onChange={(e) => setCustIssue(e.target.value)}
                                placeholder={t.placeholderIssue}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-maroon-50 resize-none"
                              />
                            </div>
                          )}

                          <div className="flex gap-4 pt-4">
                            <button 
                              type="submit"
                              className="flex-1 bg-rose-600 hover:bg-rose-500 py-4 rounded-2xl font-bold transition-colors shadow-lg shadow-rose-900/40"
                            >
                                {activeForm?.includes("edit") ? t.save : t.save}
                            </button>
                            <button 
                              type="button"
                              onClick={closeModals}
                              className="flex-1 bg-white/5 hover:bg-white/10 py-4 rounded-2xl font-bold transition-colors"
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
              {(selectedCategory !== "screens" || selectedFolder) && (
                <div className="glass rounded-[2.5rem] p-8 min-h-[400px] border-dashed border-maroon-800/50">
                  {selectedCategory === "all_inventory" ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-rose-600 rounded-2xl">
                             <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{t.inventory}</h3>
                            <p className="text-maroon-400 text-sm">{t.totalItems}: {products.reduce((acc, p) => acc + p.quantity, 0)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {products.length > 0 ? (
                          products.map(product => (
                            <div key={product.id} className="glass-dark p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/5 transition-all">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${product.quantity < 3 ? 'bg-amber-500/20 text-amber-500' : 'bg-maroon-900/40 text-rose-400'}`}>
                                  {product.category === 'screens' ? <Smartphone size={20} /> : <Zap size={20} />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <div className="font-bold">{product.name}</div>
                                    {product.quantity < 3 && (
                                      <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg border border-amber-500/20">
                                        {lang === 'ar' ? 'مخزون منخفض' : 'Low Stock'}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-maroon-400">{product.brand} - {t.location}: {product.loc}</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8">
                                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => withdrawProduct(product.id)}
                                    disabled={product.quantity <= 0}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${product.quantity > 0 ? 'hover:bg-rose-600/20 text-rose-400' : 'text-maroon-700 cursor-not-allowed'}`}
                                  >
                                    -
                                  </motion.button>
                                  <div className={`w-10 text-center font-bold ${product.quantity < 3 ? 'text-amber-500' : 'text-rose-400'}`}>
                                    {product.quantity}
                                  </div>
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => incrementProduct(product.id)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-emerald-600/20 text-emerald-400 transition-colors"
                                  >
                                    +
                                  </motion.button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => startEditProduct(product)}
                                    className="p-2 text-maroon-700 hover:text-emerald-500 transition-colors"
                                  >
                                    <Settings size={18} />
                                  </button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={product.quantity <= 0}
                                    onClick={() => withdrawProduct(product.id)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                                      product.quantity > 0 
                                      ? 'bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white ring-1 ring-rose-500/20' 
                                      : 'bg-maroon-900/40 text-maroon-600 cursor-not-allowed'
                                    }`}
                                  >
                                    <History size={16} />
                                    {t.withdrawPiece}
                                  </motion.button>
                                  <button 
                                    onClick={() => deleteProduct(product.id)}
                                    className="p-2 text-maroon-700 hover:text-rose-500 transition-colors"
                                  >
                                    <X size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-20 text-center">
                            <div className="inline-flex p-6 bg-white/5 rounded-full mb-4">
                              <Package className="w-12 h-12 text-maroon-700" />
                            </div>
                            <h4 className="text-xl font-bold text-maroon-300">{t.emptyInventory}</h4>
                            <p className="text-maroon-500 max-w-xs mx-auto mt-2">{t.emptyInventoryDesc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : selectedCategory === "maintenance" ? (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-rose-600 rounded-2xl shadow-lg shadow-rose-900/20">
                             <UserCheck className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{t.maintenance}</h3>
                            <p className="text-maroon-400 text-sm">{t.activeCustomers}: {maintenanceRecords.length}</p>
                          </div>
                        </div>
                        <div className="flex-1 max-w-sm">
                          <div className="glass-dark px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10">
                            <Search size={16} className="text-maroon-500" />
                            <input 
                              type="text"
                              value={maintenanceSearchQuery}
                              onChange={(e) => setMaintenanceSearchQuery(e.target.value)}
                              placeholder={lang === 'ar' ? 'بحث عن اسم زبون...' : 'Search customer name...'}
                              className="bg-transparent border-none outline-none text-xs w-full"
                            />
                          </div>
                        </div>
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
                          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-all shadow-lg shadow-rose-900/40 flex items-center gap-2"
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
                            .filter(r => 
                              r.customerName.toLowerCase().includes(maintenanceSearchQuery.toLowerCase()) ||
                              r.deviceType.toLowerCase().includes(maintenanceSearchQuery.toLowerCase())
                            )
                            .map(rec => (
                            <motion.div 
                              key={rec.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="glass-dark p-6 rounded-[2rem] border border-white/10 relative overflow-hidden group"
                            >
                              <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                  <h4 className="text-xl font-bold text-maroon-50 mb-1">{rec.customerName}</h4>
                                  <div className="flex items-center gap-3 text-maroon-300">
                                    <span className="text-xs bg-white/5 px-2 py-1 rounded-lg border border-white/5">{rec.deviceType}</span>
                                    <span className="text-xs text-rose-400 font-bold">{rec.cost} {lang === 'ar' ? 'د.ع' : 'IQD'}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => deleteRecord(rec.id)}
                                    className="p-2 bg-white/5 hover:bg-rose-500/20 text-maroon-500 hover:text-rose-500 rounded-lg transition-all"
                                    title="Delete Card"
                                  >
                                    <X size={16} />
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
                              <div className="p-4 bg-maroon-950/40 rounded-xl mb-4 text-sm text-maroon-200 border border-white/5 group-hover:bg-maroon-900/20 transition-colors">
                                <span className="text-maroon-500 block text-[10px] mb-1 font-bold uppercase tracking-wider">{t.issue}</span>
                                {rec.issue}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 mt-4 text-[10px] text-maroon-400 font-medium">
                                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                                  <Clock size={12} />
                                  <span>{t.entryDate}: {rec.entryDate}</span>
                                </div>
                                {rec.readyDate && (
                                  <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
                                    <CheckCircle2 size={12} />
                                    <span>{t.readyDate}: {rec.readyDate}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between mt-6">
                                <div className="flex items-center gap-2">
                                  {rec.isReady ? (
                                    <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                                      <CheckCircle2 size={16} />
                                      <span>{t.readyToDeliver}</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1.5 text-rose-400 text-sm font-bold bg-rose-400/10 px-3 py-1.5 rounded-full border border-rose-400/20">
                                      <Clock size={16} />
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
                              <UserCheck className="w-12 h-12 text-maroon-700" />
                            </div>
                            <h4 className="text-xl font-bold text-maroon-300">{t.noRecords}</h4>
                            <p className="text-maroon-500 max-w-xs mx-auto mt-2">{t.noRecordsDesc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                       <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${CATEGORIES.find(c => c.id === selectedCategory)?.color || 'from-rose-600 to-maroon-600'}`}>
                             {(() => {
                               const Icon = CATEGORIES.find(c => c.id === selectedCategory)?.icon || Package;
                               return <Icon className="w-6 h-6 text-white" />;
                             })()}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{CATEGORIES.find(c => c.id === selectedCategory) ? t[CATEGORIES.find(c => c.id === selectedCategory)!.nameKey as keyof typeof t] : "..."}</h3>
                            <p className="text-maroon-400 text-sm">{t.viewFolderContents}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="glass-dark text-xs px-3 py-2 rounded-xl border border-white/10 outline-none"
                           >
                             <option value="name" className="bg-maroon-950">{lang === 'ar' ? 'الاسم' : 'Name'}</option>
                             <option value="quantity" className="bg-maroon-950">{lang === 'ar' ? 'الكمية' : 'Quantity'}</option>
                             <option value="brand" className="bg-maroon-950">{lang === 'ar' ? 'الماركة' : 'Brand'}</option>
                           </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {(() => {
                          const displayed = products
                            .filter(p => {
                              if (p.category !== selectedCategory) return false;
                              if (selectedCategory === "screens" && selectedFolder && p.brand.toLowerCase() !== selectedFolder.toLowerCase()) return false;
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
                              <div key={product.id} className="glass-dark p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${product.quantity < 3 ? 'bg-amber-500/20 text-amber-500' : 'bg-maroon-900/40 text-rose-400'}`}>
                                    {product.category === 'screens' ? <Smartphone size={20} /> : <Zap size={20} />}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <div className="font-bold">{product.name}</div>
                                      {product.quantity < 3 && (
                                        <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg border border-amber-500/20">
                                          {lang === 'ar' ? 'مخزون منخفض' : 'Low Stock'}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-maroon-400">{product.brand} - {t.location}: {product.loc}</div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8">
                                  <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => withdrawProduct(product.id)}
                                      disabled={product.quantity <= 0}
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${product.quantity > 0 ? 'hover:bg-rose-600/20 text-rose-400' : 'text-maroon-700 cursor-not-allowed'}`}
                                    >
                                      -
                                    </motion.button>
                                    <div className={`w-10 text-center font-bold ${product.quantity < 3 ? 'text-amber-500' : 'text-rose-400'}`}>
                                      {product.quantity}
                                    </div>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => incrementProduct(product.id)}
                                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-emerald-600/20 text-emerald-400 transition-colors"
                                    >
                                      +
                                    </motion.button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => startEditProduct(product)}
                                      className="p-2 text-maroon-700 hover:text-emerald-500 transition-colors"
                                    >
                                      <Settings size={18} />
                                    </button>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      disabled={product.quantity <= 0}
                                      onClick={() => withdrawProduct(product.id)}
                                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                                        product.quantity > 0 
                                        ? 'bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white ring-1 ring-rose-500/20' 
                                        : 'bg-maroon-900/40 text-maroon-600 cursor-not-allowed'
                                      }`}
                                    >
                                      <History size={16} />
                                      {t.withdrawPiece}
                                    </motion.button>
                                    <button 
                                      onClick={() => deleteProduct(product.id)}
                                      className="p-2 text-maroon-700 hover:text-rose-500 transition-colors"
                                    >
                                      <X size={18} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-20 text-center">
                              <div className="inline-flex p-6 bg-white/5 rounded-full mb-4">
                                 {(() => {
                                   const Icon = CATEGORIES.find(c => c.id === selectedCategory)?.icon || Package;
                                   return <Icon className="w-12 h-12 text-maroon-700" />;
                                 })()}
                              </div>
                              <h4 className="text-xl font-bold text-maroon-300">{t.emptyInventory}</h4>
                              <p className="text-maroon-500 max-w-xs mx-auto mt-2">
                                {lang === 'ar' ? `لا توجد أي قطع مضافة في ${t[CATEGORIES.find(c => c.id === selectedCategory)!.nameKey as keyof typeof t]} حاليا.` : `No parts added in ${t[CATEGORIES.find(c => c.id === selectedCategory)!.nameKey as keyof typeof t]} yet.`}
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

      {/* Footer / Status Bar */}
      <footer className="mt-20 border-t border-maroon-900/30 pt-8 pb-4 text-center">
        <p className="text-maroon-500 text-sm font-light">
          {lang === 'ar' ? 'تم انشاء التطبيق بواسطه الدكتور حمد' : 'App created by Dr. Hamad'}
        </p>
      </footer>
    </div>
  );
}
