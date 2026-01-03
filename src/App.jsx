import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, Edit2, Check, X, Upload } from 'lucide-react';

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [income, setIncome] = useState(0);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [editingIncome, setEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isProcessingDocument, setIsProcessingDocument] = useState(false);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Yiyecek & İçecek',
    date: new Date().toISOString().split('T')[0]
  });

  const [newBudget, setNewBudget] = useState({
    category: 'Yiyecek & İçecek',
    limit: ''
  });

  const categories = [
    'Yiyecek & İçecek',
    'Ulaşım',
    'Alışveriş',
    'Eğlence',
    'Faturalar',
    'Sağlık',
    'Eğitim',
    'Diğer'
  ];

  // Load data from persistent storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const expensesData = await window.storage.get('budget-expenses');
        const budgetsData = await window.storage.get('budget-budgets');
        const incomeData = await window.storage.get('budget-income');

        if (expensesData) setExpenses(JSON.parse(expensesData.value));
        if (budgetsData) setBudgets(JSON.parse(budgetsData.value));
        if (incomeData) setIncome(parseFloat(incomeData.value));
      } catch (error) {
        console.log('İlk kullanım - veri yüklenmedi');
      }
    };
    loadData();
    
    // Kullanıcının ekstresini işle
    if (!isProcessingDocument) {
      processUserStatement();
    }
  }, []);

  const processUserStatement = () => {
    setIsProcessingDocument(true);
    const statementExpenses = [
      // Yiyecek & İçecek
      { description: "ÖZPAŞ MARKET", amount: 79.90, category: "Yiyecek & İçecek", date: "2025-12-04" },
      { description: "ÖZPAŞ MARKET", amount: 90.00, category: "Yiyecek & İçecek", date: "2025-11-11" },
      { description: "STARBUCKS Cadde 54", amount: 120.00, category: "Yiyecek & İçecek", date: "2025-11-26" },
      { description: "MANAV MARKET", amount: 167.00, category: "Yiyecek & İçecek", date: "2025-11-12" },
      { description: "STARBUCKS Ada Outlet", amount: 270.00, category: "Yiyecek & İçecek", date: "2025-11-11" },
      { description: "İZMİT SİMİT FIRINI", amount: 165.00, category: "Yiyecek & İçecek", date: "2025-11-11" },
      { description: "PINAR İLKİS", amount: 800.00, category: "Yiyecek & İçecek", date: "2025-11-15" },
      { description: "HUNDURE GIDA", amount: 614.50, category: "Yiyecek & İçecek", date: "2025-12-04" },
      { description: "HUNDURE GIDA", amount: 260.00, category: "Yiyecek & İçecek", date: "2025-12-02" },
      { description: "GECEPİLAVCISI", amount: 400.00, category: "Yiyecek & İçecek", date: "2025-11-29" },
      { description: "FATİH ÇELİK", amount: 240.00, category: "Yiyecek & İçecek", date: "2025-11-23" },
      { description: "CARIBOU SAKARYA", amount: 260.00, category: "Yiyecek & İçecek", date: "2025-11-14" },
      { description: "STARBUCKS Adapazarı", amount: 135.00, category: "Yiyecek & İçecek", date: "2025-11-10" },
      { description: "YEMEKSEPETI", amount: 340.98, category: "Yiyecek & İçecek", date: "2025-12-06" },
      { description: "ZIMMAR GIDA MARKET", amount: 90.00, category: "Yiyecek & İçecek", date: "2025-11-25" },
      { description: "ZIMMAR GIDA MARKET", amount: 90.00, category: "Yiyecek & İçecek", date: "2025-11-14" },
      { description: "TCHIBO CADDE 54", amount: 225.00, category: "Yiyecek & İçecek", date: "2025-11-12" },
      { description: "TCHIBO KAHVE", amount: 115.00, category: "Yiyecek & İçecek", date: "2025-11-30" },
      { description: "TCHIBO CADDE 54", amount: 115.00, category: "Yiyecek & İçecek", date: "2025-11-07" },
      { description: "İPEK PİSMANİYE", amount: 280.00, category: "Yiyecek & İçecek", date: "2025-11-11" },
      { description: "GRP GIDA (Fast Food)", amount: 30.00, category: "Yiyecek & İçecek", date: "2025-11-13" },
      { description: "YEKPARE UNLU MAMULLER", amount: 950.00, category: "Yiyecek & İçecek", date: "2025-12-05" },
      
      // Ulaşım
      { description: "ADAPAZARI OPET", amount: 816.53, category: "Ulaşım", date: "2025-11-29" },
      { description: "ZONGULDAK EREĞLİ PETROL", amount: 1000.00, category: "Ulaşım", date: "2025-11-15" },
      { description: "YAVUZ AKARYAKIT", amount: 90.00, category: "Ulaşım", date: "2025-11-11" },
      { description: "KARAYOLLARI Genel Müdürlüğü", amount: 378.00, category: "Ulaşım", date: "2025-11-23" },
      { description: "KARAYOLLARI Genel Müdürlüğü", amount: 228.00, category: "Ulaşım", date: "2025-11-14" },
      { description: "MOKA UNITED Otomotiv", amount: 600.00, category: "Ulaşım", date: "2025-09-02" },
      
      // Alışveriş
      { description: "TRENDYOL.COM", amount: 265.00, category: "Alışveriş", date: "2025-11-21" },
      { description: "TRENDYOL.COM Taksit", amount: 2079.17, category: "Alışveriş", date: "2025-09-22" },
      { description: "HEPSİBURADA", amount: 1.00, category: "Alışveriş", date: "2025-11-21" },
      { description: "HEPSİBURADA", amount: 548.49, category: "Alışveriş", date: "2025-11-21" },
      { description: "RECEPOĞLU KARDEŞLER", amount: 30.00, category: "Alışveriş", date: "2025-11-14" },
      { description: "PABLO TOBACCO", amount: 90.00, category: "Diğer", date: "2025-11-26" },
      
      // Faturalar
      { description: "AÇIKDENİZ ALTERNATİF ENERJİ", amount: 500.00, category: "Faturalar", date: "2025-11-10" },
      { description: "TURKCELL Fatura", amount: 510.00, category: "Faturalar", date: "2025-12-01" },
      { description: "MİLLENİ.COM İnternet", amount: 545.14, category: "Faturalar", date: "2025-11-14" },
      { description: "GÜMRÜKÖNÜ Vergi Dairesi", amount: 2777.75, category: "Faturalar", date: "2025-11-14" },
      
      // Sağlık
      { description: "QUICK SİGORTA", amount: 15446.98, category: "Sağlık", date: "2025-11-15" },
      { description: "QUICK HAYAT SİGORTA", amount: 200.00, category: "Sağlık", date: "2025-11-15" },
      { description: "BELPAŞ Sigorta", amount: 200.00, category: "Sağlık", date: "2025-11-19" },
      { description: "CORNERVET Veteriner Kliniği", amount: 3100.00, category: "Sağlık", date: "2025-12-02" },
      { description: "VET LIFE Veterinerlik", amount: 2700.00, category: "Sağlık", date: "2025-12-02" },
      
      // Eğlence
      { description: "SAKARYASPOR SALONU", amount: 4800.00, category: "Eğlence", date: "2025-11-13" },
      { description: "BİLETİNİAL Etkinlik", amount: 256.98, category: "Eğlence", date: "2025-12-04" },
      { description: "BİLETİNİAL Etkinlik", amount: 256.98, category: "Eğlence", date: "2025-12-04" },
    ];

    const expensesWithIds = statementExpenses.map((exp, idx) => ({
      ...exp,
      id: Date.now() + idx
    }));

    setExpenses(prev => [...expensesWithIds, ...prev]);
    setUploadStatus(`✅ Ekstrenizden ${statementExpenses.length} harcama eklendi!`);
    setTimeout(() => setUploadStatus(''), 5000);
    
    // Kullanıcının maaşını ekle
    setIncome(36250);
    
    // Bütçe limitlerini ekle
    const defaultBudgets = [
      { category: 'Yiyecek & İçecek', limit: 5000 },
      { category: 'Ulaşım', limit: 3000 },
      { category: 'Alışveriş', limit: 3000 },
      { category: 'Eğlence', limit: 2000 },
      { category: 'Faturalar', limit: 5000 },
      { category: 'Sağlık', limit: 2000 },
      { category: 'Eğitim', limit: 1000 },
      { category: 'Diğer', limit: 1000 }
    ];
    setBudgets(defaultBudgets);
  };

  // Save data to persistent storage
  useEffect(() => {
    const saveData = async () => {
      try {
        await window.storage.set('budget-expenses', JSON.stringify(expenses));
        await window.storage.set('budget-budgets', JSON.stringify(budgets));
        await window.storage.set('budget-income', income.toString());
      } catch (error) {
        console.error('Veri kaydedilemedi:', error);
      }
    };
    if (expenses.length > 0 || budgets.length > 0 || income > 0) {
      saveData();
    }
  }, [expenses, budgets, income]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Dosya boyutu kontrolü (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('❌ Dosya çok büyük (max 5MB)');
      setTimeout(() => setUploadStatus(''), 3000);
      event.target.value = '';
      return;
    }

    setUploading(true);
    setUploadStatus('📄 Dosya okunuyor...');

    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = () => reject(new Error('Dosya okunamadı'));
        reader.readAsDataURL(file);
      });

      const mediaType = file.type || 'image/jpeg';
      setUploadStatus('🤖 AI ekstreyi analiz ediyor...');

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [
            {
              role: "user",
              content: [
                mediaType === 'application/pdf' ? {
                  type: "document",
                  source: { type: "base64", media_type: mediaType, data: base64Data }
                } : {
                  type: "image",
                  source: { type: "base64", media_type: mediaType, data: base64Data }
                },
                {
                  type: "text",
                  text: `Bu bir kredi kartı ekstresi. İçindeki TÜM harcamaları çıkar ve JSON formatında ver.

Kurallar:
- Tarih formatı: YYYY-MM-DD
- Kategori şunlardan biri olmalı: ${categories.join(', ')}
- Sadece JSON yanıt ver, açıklama yazma

Örnek format:
{
  "expenses": [
    {"description": "Market", "amount": 150.50, "category": "Yiyecek & İçecek", "date": "2024-01-15"}
  ]
}`
                }
              ]
            }
          ],
        })
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.content || data.content.length === 0) {
        throw new Error('API yanıt vermedi');
      }

      const text = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n");

      if (!text) {
        throw new Error('Ekstrede harcama bulunamadı');
      }

      // JSON'u temizle ve parse et
      let cleanText = text.trim();
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      cleanText = cleanText.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      
      const parsed = JSON.parse(cleanText);

      if (!parsed.expenses || !Array.isArray(parsed.expenses) || parsed.expenses.length === 0) {
        throw new Error('Ekstrede harcama bulunamadı');
      }

      const newExpenses = parsed.expenses.map((exp, index) => ({
        ...exp,
        id: Date.now() + index,
        amount: parseFloat(exp.amount) || 0
      }));
      
      setExpenses([...expenses, ...newExpenses]);
      setUploadStatus(`✅ ${newExpenses.length} harcama başarıyla eklendi!`);
      setTimeout(() => setUploadStatus(''), 4000);
      
    } catch (error) {
      console.error('Detaylı hata:', error);
      let errorMsg = '❌ ';
      
      if (error.message.includes('JSON')) {
        errorMsg += 'Ekstresi okunamadı. Lütfen daha net bir görsel deneyin.';
      } else if (error.message.includes('API')) {
        errorMsg += 'Bağlantı hatası. Lütfen tekrar deneyin.';
      } else {
        errorMsg += error.message || 'Dosya işlenemedi';
      }
      
      setUploadStatus(errorMsg);
      setTimeout(() => setUploadStatus(''), 5000);
      
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ description: '', amount: '', category: 'Yiyecek & İçecek', date: new Date().toISOString().split('T')[0] });
      setShowAddExpense(false);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const addBudget = () => {
    if (newBudget.limit) {
      const existing = budgets.find(b => b.category === newBudget.category);
      if (existing) {
        setBudgets(budgets.map(b => b.category === newBudget.category ? { ...b, limit: parseFloat(newBudget.limit) } : b));
      } else {
        setBudgets([...budgets, { ...newBudget, limit: parseFloat(newBudget.limit) }]);
      }
      setNewBudget({ category: 'Yiyecek & İçecek', limit: '' });
      setShowAddBudget(false);
    }
  };

  const deleteBudget = (category) => {
    setBudgets(budgets.filter(b => b.category !== category));
  };

  const saveIncome = () => {
    const value = parseFloat(tempIncome);
    if (!isNaN(value)) {
      setIncome(value);
      setEditingIncome(false);
      setTempIncome('');
    }
  };

  const getCategoryExpenses = (category) => {
    return expenses.filter(exp => exp.category === category).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = income - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Bütçe Takip Sistemi</h1>
          <p className="text-gray-600">Harcamalarınızı takip edin, bütçenizi yönetin</p>
        </div>

        {/* Özet Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Gelir</h3>
              {editingIncome ? (
                <div className="flex gap-2">
                  <button onClick={saveIncome} className="text-green-600 hover:text-green-700">
                    <Check size={18} />
                  </button>
                  <button onClick={() => { setEditingIncome(false); setTempIncome(''); }} className="text-red-600 hover:text-red-700">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button onClick={() => { setEditingIncome(true); setTempIncome(income.toString()); }} className="text-blue-600 hover:text-blue-700">
                  <Edit2 size={18} />
                </button>
              )}
            </div>
            {editingIncome ? (
              <input
                type="number"
                value={tempIncome}
                onChange={(e) => setTempIncome(e.target.value)}
                className="w-full text-2xl font-bold text-green-600 border-b-2 border-green-600 outline-none"
                placeholder="0"
              />
            ) : (
              <div className="flex items-center gap-2">
                <TrendingUp className="text-green-600" size={24} />
                <p className="text-3xl font-bold text-green-600">{income.toLocaleString('tr-TR')} ₺</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 font-medium mb-2">Toplam Harcama</h3>
            <div className="flex items-center gap-2">
              <TrendingDown className="text-red-600" size={24} />
              <p className="text-3xl font-bold text-red-600">{totalExpenses.toLocaleString('tr-TR')} ₺</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-600 font-medium mb-2">Kalan</h3>
            <div className="flex items-center gap-2">
              <Wallet className={balance >= 0 ? "text-blue-600" : "text-red-600"} size={24} />
              <p className={`text-3xl font-bold ${balance >= 0 ? "text-blue-600" : "text-red-600"}`}>
                {balance.toLocaleString('tr-TR')} ₺
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Harcamalar */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Harcamalar</h2>
              <div className="flex gap-2">
                <label className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <Upload size={20} />
                  {uploading ? 'Yükleniyor...' : 'Ekstreyi Yükle'}
                </label>
                <button
                  onClick={() => setShowAddExpense(!showAddExpense)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                  <Plus size={20} /> Manuel Ekle
                </button>
              </div>
            </div>

            {uploadStatus && (
              <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
                uploadStatus.includes('✓') ? 'bg-green-100 text-green-800' :
                uploadStatus.includes('❌') ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {uploadStatus}
              </div>
            )}

            {showAddExpense && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <input
                  type="text"
                  placeholder="Açıklama"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full mb-2 px-3 py-2 rounded border border-gray-300 outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Tutar (₺)"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full mb-2 px-3 py-2 rounded border border-gray-300 outline-none focus:border-blue-500"
                />
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full mb-2 px-3 py-2 rounded border border-gray-300 outline-none focus:border-blue-500"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full mb-2 px-3 py-2 rounded border border-gray-300 outline-none focus:border-blue-500"
                />
                <button
                  onClick={addExpense}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Kaydet
                </button>
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {expenses.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Henüz harcama eklenmedi</p>
              ) : (
                expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
                  <div key={expense.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{expense.description}</p>
                      <p className="text-sm text-gray-500">{expense.category} • {new Date(expense.date).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-red-600">{expense.amount.toLocaleString('tr-TR')} ₺</p>
                      <button onClick={() => deleteExpense(expense.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bütçeler */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Bütçe Limitleri</h2>
              <button
                onClick={() => setShowAddBudget(!showAddBudget)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
              >
                <Plus size={20} /> Ekle
              </button>
            </div>

            {showAddBudget && (
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  className="w-full mb-2 px-3 py-2 rounded border border-gray-300 outline-none focus:border-green-500"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Limit (₺)"
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                  className="w-full mb-2 px-3 py-2 rounded border border-gray-300 outline-none focus:border-green-500"
                />
                <button
                  onClick={addBudget}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Kaydet
                </button>
              </div>
            )}

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {budgets.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Henüz bütçe limiti eklenmedi</p>
              ) : (
                budgets.map(budget => {
                  const spent = getCategoryExpenses(budget.category);
                  const percentage = (spent / budget.limit) * 100;
                  const isOverBudget = percentage > 100;

                  return (
                    <div key={budget.category} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-800">{budget.category}</h3>
                        <button onClick={() => deleteBudget(budget.category)} className="text-red-600 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className={isOverBudget ? "text-red-600 font-medium" : "text-gray-600"}>
                          {spent.toLocaleString('tr-TR')} ₺ / {budget.limit.toLocaleString('tr-TR')} ₺
                        </span>
                        <span className={isOverBudget ? "text-red-600 font-medium" : "text-gray-600"}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${isOverBudget ? 'bg-red-600' : 'bg-green-600'}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
