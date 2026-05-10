import 'dart:convert';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

// =============================================================================
// MODELS
// =============================================================================

class Product {
  final String id;
  String name;
  int quantity;
  String category;
  String brand;
  String location;
  DateTime createdAt;

  Product({
    required this.id,
    required this.name,
    required this.quantity,
    required this.category,
    required this.brand,
    required this.location,
    required this.createdAt,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'quantity': quantity,
    'category': category,
    'brand': brand,
    'location': location,
    'createdAt': createdAt.toIso8601String(),
  };

  factory Product.fromJson(Map<String, dynamic> json) => Product(
    id: json['id'],
    name: json['name'],
    quantity: json['quantity'],
    category: json['category'],
    brand: json['brand'],
    location: json['location'],
    createdAt: DateTime.parse(json['createdAt']),
  );
}

class CustomerCard {
  final String id;
  String name;
  String device;
  double cost;
  String issue;
  bool isReady;
  DateTime entryDate;
  DateTime? readyDate;

  CustomerCard({
    required this.id,
    required this.name,
    required this.device,
    required this.cost,
    required this.issue,
    this.isReady = false,
    required this.entryDate,
    this.readyDate,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'device': device,
    'cost': cost,
    'issue': issue,
    'isReady': isReady,
    'entryDate': entryDate.toIso8601String(),
    'readyDate': readyDate?.toIso8601String(),
  };

  factory CustomerCard.fromJson(Map<String, dynamic> json) => CustomerCard(
    id: json['id'],
    name: json['name'],
    device: json['device'],
    cost: (json['cost'] as num).toDouble(),
    issue: json['issue'],
    isReady: json['isReady'],
    entryDate: DateTime.parse(json['entryDate']),
    readyDate: json['readyDate'] != null ? DateTime.parse(json['readyDate']) : null,
  );
}

class Activity {
  final String id;
  final String title;
  final String description;
  final DateTime timestamp;
  final bool isWithdraw;

  Activity({
    required this.id,
    required this.title,
    required this.description,
    required this.timestamp,
    this.isWithdraw = false,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'description': description,
    'timestamp': timestamp.toIso8601String(),
    'isWithdraw': isWithdraw,
  };

  factory Activity.fromJson(Map<String, dynamic> json) => Activity(
    id: json['id'],
    title: json['title'],
    description: json['description'],
    timestamp: DateTime.parse(json['timestamp']),
    isWithdraw: json['isWithdraw'] ?? false,
  );
}

// =============================================================================
// STATE MANAGEMENT (PROVIDER)
// =============================================================================

class AppProvider with ChangeNotifier {
  List<Product> _products = [];
  List<CustomerCard> _cards = [];
  List<Activity> _activities = [];
  bool _isLoading = true;
  bool _hasUnreadNotifications = false;

  List<Product> get products => _products;
  List<CustomerCard> get cards => _cards;
  List<Activity> get activities => _activities;
  bool get isLoading => _isLoading;
  bool get hasUnreadNotifications => _hasUnreadNotifications;

  AppProvider() {
    loadData();
  }

  Future<void> loadData() async {
    final prefs = await SharedPreferences.getInstance();
    final pData = prefs.getString('products');
    final cData = prefs.getString('cards');
    final aData = prefs.getString('activities');

    if (pData != null) {
      final List dec = json.decode(pData);
      _products = dec.map((e) => Product.fromJson(e)).toList();
    }
    if (cData != null) {
      final List dec = json.decode(cData);
      _cards = dec.map((e) => CustomerCard.fromJson(e)).toList();
    }
    if (aData != null) {
      final List dec = json.decode(aData);
      _activities = dec.map((e) => Activity.fromJson(e)).toList();
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<void> saveData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('products', json.encode(_products.map((e) => e.toJson()).toList()));
    await prefs.setString('cards', json.encode(_cards.map((e) => e.toJson()).toList()));
    await prefs.setString('activities', json.encode(_activities.map((e) => e.toJson()).toList()));
  }

  void addProduct(Product p) {
    _products.insert(0, p);
    addActivity(Activity(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: 'إضافة منتج جديد',
      description: 'تمت إضافة ${p.name} بكمية ${p.quantity}',
      timestamp: DateTime.now(),
    ));
    saveData();
    notifyListeners();
  }

  void withdrawProduct(String id, int qty) {
    final index = _products.indexWhere((element) => element.id == id);
    if (index != -1 && _products[index].quantity >= qty) {
      _products[index].quantity -= qty;
      addActivity(Activity(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        title: 'سحب منتج',
        description: 'تم سحب $qty قطعة من ${_products[index].name}',
        timestamp: DateTime.now(),
        isWithdraw: true,
      ));
      saveData();
      notifyListeners();
    }
  }

  void addActivity(Activity activity) {
    _activities.insert(0, activity);
    _hasUnreadNotifications = true;
    if (_activities.length > 50) _activities.removeLast();
  }

  void markNotificationsRead() {
    _hasUnreadNotifications = false;
    notifyListeners();
  }

  void updateProduct(Product p) {
    final index = _products.indexWhere((element) => element.id == p.id);
    if (index != -1) {
      _products[index] = p;
      saveData();
      notifyListeners();
    }
  }

  void deleteProduct(String id) {
    _products.removeWhere((element) => element.id == id);
    saveData();
    notifyListeners();
  }

  void addCard(CustomerCard c) {
    _cards.insert(0, c);
    saveData();
    notifyListeners();
  }

  void toggleCardReady(String id) {
    final index = _cards.indexWhere((element) => element.id == id);
    if (index != -1) {
      _cards[index].isReady = !_cards[index].isReady;
      _cards[index].readyDate = _cards[index].isReady ? DateTime.now() : null;
      saveData();
      notifyListeners();
    }
  }

  void deleteCard(String id) {
    _cards.removeWhere((element) => element.id == id);
    saveData();
    notifyListeners();
  }
}

// =============================================================================
// MAIN ENTRY POINT
// =============================================================================

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppProvider(),
      child: const NewPhoneApp(),
    ),
  );
}

class NewPhoneApp extends StatelessWidget {
  const NewPhoneApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'نيو فون قسم الصيانه',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.rose,
        fontFamily: 'Alexandria', 
        scaffoldBackgroundColor: const Color(0xFF4C0519), // maroon-950
      ),
      home: const Directionality(
        textDirection: TextDirection.rtl,
        child: LoginScreen(),
      ),
    );
  }
}

// =============================================================================
// LOGIN SCREEN
// =============================================================================

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF4C0519), Color(0xFF881337)],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Spacer(),
                // Logo or Icon
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.05),
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white.withOpacity(0.1)),
                  ),
                  child: const Icon(Icons.phonelink_setup_rounded, size: 80, color: Colors.roseAccent),
                ),
                const SizedBox(height: 30),
                const Text(
                  'نيو فون',
                  style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -1),
                ),
                const Text(
                  'نظام إدارة الصيانة والمخزن',
                  style: TextStyle(fontSize: 16, color: Colors.roseAccent, fontWeight: FontWeight.w500),
                ),
                const Spacer(),
                
                // Google Login Button
                GestureDetector(
                  onTap: () {
                    // Mock Google Login
                    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomeScreen()));
                  },
                  child: GlassContainer(
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    borderRadius: 20,
                    opacity: 0.08,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.network(
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_\"G\"_logo.svg/1200px-Google_\"G\"_logo.svg.png',
                          height: 24,
                        ),
                        const SizedBox(width: 15),
                        const Text(
                          'تسجيل الدخول عبر جوجل',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 15),
                
                // Guest Login Button
                GestureDetector(
                  onTap: () {
                    // Guest Login
                    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomeScreen()));
                  },
                  child: GlassContainer(
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    borderRadius: 20,
                    opacity: 0.15,
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.person_outline_rounded, color: Colors.white70),
                        SizedBox(width: 15),
                        Text(
                          'تسجيل الدخول كضيف',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 50),
                const Text(
                  'بإكمال تسجيل الدخول، أنت توافق على شروط الخدمة',
                  style: TextStyle(fontSize: 10, color: Colors.white24),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// =============================================================================
// UI COMPONENTS & SCREENS
// =============================================================================

class GlassContainer extends StatelessWidget {
  final Widget child;
  final double blur;
  final double opacity;
  final EdgeInsets padding;
  final double borderRadius;

  const GlassContainer({
    super.key,
    required this.child,
    this.blur = 15,
    this.opacity = 0.1,
    this.padding = const EdgeInsets.all(16),
    this.borderRadius = 25,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(opacity),
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(color: Colors.white.withOpacity(0.15)),
          ),
          child: child,
        ),
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: NetworkImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'),
            fit: BoxFit.cover,
            opacity: 0.1,
          ),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF4C0519), Color(0xFF881337)],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(),
              _buildStats(provider),
              Expanded(
                child: _selectedIndex == 0 ? _buildInventory(provider) : _buildMaintenance(provider),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: _buildBottomNav(),
      floatingActionButton: _buildFAB(),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }

  Widget _buildHeader() {
    final provider = Provider.of<AppProvider>(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('نيو فون', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -0.5)),
              Text('قسم الصيانه والمخزن', style: TextStyle(fontSize: 14, color: Colors.roseAccent, fontWeight: FontWeight.w500)),
            ],
          ),
          GestureDetector(
            onTap: () {
              provider.markNotificationsRead();
              _showNotifications(provider);
            },
            child: Stack(
              children: [
                GlassContainer(
                  padding: const EdgeInsets.all(10),
                  borderRadius: 15,
                  child: const Icon(Icons.notifications_active_rounded, color: Colors.amber, size: 24),
                ),
                if (provider.hasUnreadNotifications)
                  Positioned(
                    top: 8,
                    right: 8,
                    child: Container(
                      width: 10,
                      height: 10,
                      decoration: const BoxDecoration(
                        color: Colors.redAccent,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showNotifications(AppProvider provider) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.7,
        child: GlassContainer(
          borderRadius: 30,
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 20),
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const Row(
                children: [
                  Icon(Icons.history_rounded, color: Colors.roseAccent),
                  SizedBox(width: 12),
                  Text('سجل النشاطات والإشعارات', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 20),
              Expanded(
                child: provider.activities.isEmpty
                    ? _buildEmptyState(Icons.notifications_none_rounded, 'لا توجد نشاطات حالياً')
                    : ListView.builder(
                        itemCount: provider.activities.length,
                        itemBuilder: (context, index) {
                          final activity = provider.activities[index];
                          return Container(
                            margin: const EdgeInsets.only(bottom: 12),
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.05),
                              borderRadius: BorderRadius.circular(15),
                              border: Border.all(color: Colors.white.withOpacity(0.05)),
                            ),
                            child: Row(
                              children: [
                                Icon(
                                  activity.isWithdraw ? Icons.upload_rounded : Icons.download_rounded,
                                  color: activity.isWithdraw ? Colors.orangeAccent : Colors.greenAccent,
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(activity.title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                                      Text(activity.description, style: const TextStyle(fontSize: 12, color: Colors.white60)),
                                    ],
                                  ),
                                ),
                                Text(
                                  '${activity.timestamp.hour}:${activity.timestamp.minute.toString().padLeft(2, '0')}',
                                  style: const TextStyle(fontSize: 10, color: Colors.white24),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStats(AppProvider provider) {
    int totalQty = provider.products.fold(0, (sum, p) => sum + p.quantity);
    int activeCards = provider.cards.where((c) => !c.isReady).length;

    return Container(
      height: 110,
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Row(
        children: [
          Expanded(
            child: StatCard(
              title: 'إجمالي القطع',
              value: totalQty.toString(),
              icon: Icons.inventory_2_rounded,
              color: Colors.roseAccent,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: StatCard(
              title: 'بطاقات نشطة',
              value: activeCards.toString(),
              icon: Icons.assignment_ind_rounded,
              color: Colors.amberAccent,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInventory(AppProvider provider) {
    final filtered = provider.products.where((p) => p.name.toLowerCase().contains(_searchController.text.toLowerCase())).toList();

    return Column(
      children: [
        _buildSearchBar('ابحث عن قطعة (شاشة، فلات، كونكتر)...'),
        Expanded(
          child: filtered.isEmpty
              ? _buildEmptyState(Icons.inventory_2_outlined, 'لم يتم العثور على قطع')
              : ListView.builder(
                  padding: const EdgeInsets.all(24),
                  itemCount: filtered.length,
                  itemBuilder: (context, index) {
                    final p = filtered[index];
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: GlassContainer(
                        padding: const EdgeInsets.all(18),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: Colors.rose.withOpacity(0.15),
                                borderRadius: BorderRadius.circular(15),
                                border: Border.all(color: Colors.rose.withOpacity(0.3)),
                              ),
                              child: Icon(
                                p.category == 'screens' ? Icons.smartphone_rounded : 
                                p.category == 'batteries' ? Icons.battery_charging_full_rounded : Icons.settings_suggest_rounded, 
                                color: Colors.roseAccent,
                                size: 24,
                              ),
                            ),
                            const SizedBox(width: 18),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(p.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white)),
                                  const SizedBox(height: 4),
                                  Text('${p.brand} • ${p.location}', style: const TextStyle(fontSize: 12, color: Colors.white54, fontWeight: FontWeight.w500)),
                                ],
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text(p.quantity.toString(), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.greenAccent)),
                                const Text('قطعة', style: TextStyle(fontSize: 10, color: Colors.white54, fontWeight: FontWeight.bold)),
                                const SizedBox(height: 8),
                                _actionButton(
                                  Icons.outbox_rounded, 
                                  Colors.orangeAccent, 
                                  () {
                                    if (p.quantity > 0) {
                                      provider.withdrawProduct(p.id, 1);
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(content: Text('تم سحب قطعة واحدة من المخزن'))
                                      );
                                    } else {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(content: Text('الكمية غير كافية للسحب'))
                                      );
                                    }
                                  }
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildMaintenance(AppProvider provider) {
    final filtered = provider.cards.where((c) => c.name.toLowerCase().contains(_searchController.text.toLowerCase())).toList();

    return Column(
      children: [
        _buildSearchBar('ابحث عن اسم الزبون...'),
        Expanded(
          child: filtered.isEmpty
              ? _buildEmptyState(Icons.person_search_rounded, 'لا توجد بطاقات صيانة')
              : ListView.builder(
                  padding: const EdgeInsets.all(24),
                  itemCount: filtered.length,
                  itemBuilder: (context, index) {
                    final c = filtered[index];
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: GlassContainer(
                        padding: const EdgeInsets.all(20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(child: Text(c.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white))),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                  decoration: BoxDecoration(
                                    color: c.isReady ? Colors.green.withOpacity(0.15) : Colors.amber.withOpacity(0.15),
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(color: c.isReady ? Colors.greenAccent.withOpacity(0.3) : Colors.amberAccent.withOpacity(0.3)),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Icon(c.isReady ? Icons.check_circle_rounded : Icons.pending_rounded, size: 12, color: c.isReady ? Colors.greenAccent : Colors.amberAccent),
                                      const SizedBox(width: 6),
                                      Text(
                                        c.isReady ? 'جاهز للتسليم' : 'قيد العمل',
                                        style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: c.isReady ? Colors.greenAccent : Colors.amberAccent),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(c.device, style: const TextStyle(fontSize: 14, color: Colors.white70, fontWeight: FontWeight.w500)),
                            const SizedBox(height: 15),
                            const Divider(color: Colors.white12, height: 1),
                            const SizedBox(height: 15),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text('التكلفة المقدرة', style: TextStyle(fontSize: 10, color: Colors.white54, fontWeight: FontWeight.bold)),
                                    Text('${c.cost.toStringAsFixed(0)} د.ع', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.greenAccent)),
                                  ],
                                ),
                                Row(
                                  children: [
                                    _actionButton(
                                      Icons.done_all_rounded, 
                                      c.isReady ? Colors.white24 : Colors.greenAccent, 
                                      () => provider.toggleCardReady(c.id)
                                    ),
                                    const SizedBox(width: 8),
                                    _actionButton(
                                      Icons.delete_sweep_rounded, 
                                      Colors.roseAccent, 
                                      () => provider.deleteCard(c.id)
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _actionButton(IconData icon, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Icon(icon, size: 20, color: color),
      ),
    );
  }

  Widget _buildEmptyState(IconData icon, String message) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 64, color: Colors.white10),
          const SizedBox(height: 16),
          Text(message, style: const TextStyle(color: Colors.white24, fontSize: 16, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _buildSearchBar(String hint) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
      child: GlassContainer(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 2),
        borderRadius: 20,
        child: TextField(
          controller: _searchController,
          onChanged: (v) => setState(() {}),
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(color: Colors.white24, fontSize: 14),
            border: InputBorder.none,
            icon: const Icon(Icons.search_rounded, color: Colors.roseAccent),
          ),
        ),
      ),
    );
  }

  Widget _buildBottomNav() {
    return Container(
      margin: const EdgeInsets.only(bottom: 24, left: 24, right: 24),
      child: GlassContainer(
        padding: const EdgeInsets.symmetric(vertical: 12),
        borderRadius: 35,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _navItem(0, Icons.inventory_2_rounded, 'المخزن العام'),
            const SizedBox(width: 40),
            _navItem(1, Icons.assignment_rounded, 'بطاقات الزبائن'),
          ],
        ),
      ),
    );
  }

  Widget _navItem(int index, IconData icon, String label) {
    bool isSelected = _selectedIndex == index;
    return GestureDetector(
      onTap: () => setState(() {
        _selectedIndex = index;
        _searchController.clear();
      }),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white.withOpacity(0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          children: [
            Icon(icon, color: isSelected ? Colors.roseAccent : Colors.white54, size: 22),
            if (isSelected) const SizedBox(width: 8),
            if (isSelected) Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
          ],
        ),
      ),
    );
  }

  Widget _buildFAB() {
    return Container(
      height: 64,
      width: 64,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: const LinearGradient(
          colors: [Colors.roseAccent, Color(0xFFBE123C)],
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.rose.withOpacity(0.4),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: FloatingActionButton(
        elevation: 0,
        backgroundColor: Colors.transparent,
        child: const Icon(Icons.add_rounded, size: 32, color: Colors.white),
        onPressed: () => _showAddOptions(),
      ),
    );
  }

  void _showAddOptions() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => GlassContainer(
        borderRadius: 30,
        padding: const EdgeInsets.all(30),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('ماذا تريد أن تضيف؟', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 25),
            _bottomSheetOption(Icons.add_shopping_cart_rounded, 'منتج جديد للمخزن', Colors.emeraldAccent, () {
              Navigator.pop(context);
              _quickAddProduct();
            }),
            const SizedBox(height: 15),
            _bottomSheetOption(Icons.person_add_alt_rounded, 'بطاقة زبون صيانة', Colors.amberAccent, () {
              Navigator.pop(context);
              _quickAddCard();
            }),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _bottomSheetOption(IconData icon, String label, Color color, VoidCallback onTap) {
    return ListTile(
      onTap: onTap,
      leading: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
        child: Icon(icon, color: color),
      ),
      title: Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
      trailing: const Icon(Icons.chevron_right_rounded, color: Colors.white24),
    );
  }

  // Quick Mock Functions for Demo
  void _quickAddProduct() {
      final p = Provider.of<AppProvider>(context, listen: false);
      p.addProduct(Product(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        name: 'شاشة iPhone 15 Pro Max',
        quantity: 2,
        category: 'screens',
        brand: 'Apple',
        location: 'الرف العلوي',
        createdAt: DateTime.now(),
      ));
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('تمت إضافة المنتج بنجاح')));
  }

  void _quickAddCard() {
      final p = Provider.of<AppProvider>(context, listen: false);
      p.addCard(CustomerCard(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        name: 'زبون تجريبي',
        device: 'iPhone 14',
        cost: 45000,
        issue: 'تبديل بطارية',
        entryDate: DateTime.now(),
      ));
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('تمت إضافة البطاقة بنجاح')));
  }
}

class StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final Color color;

  const StatCard({super.key, required this.title, required this.value, required this.icon, required this.color});

  @override
  Widget build(BuildContext context) {
    return GlassContainer(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 14, color: color),
              const SizedBox(width: 8),
              Text(title, style: const TextStyle(fontSize: 10, color: Colors.white54, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
            ],
          ),
          const SizedBox(height: 4),
          Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
        ],
      ),
    );
  }
}
