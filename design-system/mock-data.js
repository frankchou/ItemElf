// ItemElf — mock data used across screens
window.IE_MOCK = (() => {
  const users = [
    { id: 'u1', name: '陳大華', role: 'owner',  avatar: '#b8764a', email: 'dahua@family.tw' },
    { id: 'u2', name: '林美玲', role: 'member', avatar: '#6b8e5a', email: 'meiling@family.tw' },
    { id: 'u3', name: '陳小安', role: 'member', avatar: '#6a9ad9', email: 'xiaoan@family.tw' },
    { id: 'u4', name: '陳阿嬤', role: 'member', avatar: '#d99b4a', email: 'grandma@family.tw' },
  ];
  const me = users[0];

  const categories = [
    { id: 'food',     zh: '食物',   en: 'Food',     icon: '🍎', scope: 'family' },
    { id: 'med',      zh: '藥品',   en: 'Medicine', icon: '💊', scope: 'family' },
    { id: 'clean',    zh: '清潔',   en: 'Cleaning', icon: '🧴', scope: 'family' },
    { id: '3c',       zh: '3C',     en: 'Tech',     icon: '💻', scope: 'family' },
    { id: 'doc',      zh: '文件',   en: 'Docs',     icon: '📄', scope: 'family' },
    { id: 'cloth',    zh: '衣物',   en: 'Clothing', icon: '👕', scope: 'family' },
    { id: 'personal', zh: '個人保養', en: 'Personal Care', icon: '🧖', scope: 'personal' },
    { id: 'diary',    zh: '私人日誌', en: 'Diary', icon: '📓', scope: 'personal' },
  ];

  const items = [
    { id: 'i01', name: '鮮奶 1L', nameEn: 'Fresh Milk 1L', scope: 'family', category: 'food',
      location: '冰箱 第二層', locationEn: 'Fridge · Shelf 2',
      status: 'expiring', expireAt: '2026-04-23', purchasedAt: '2026-04-15',
      updatedAt: '2026-04-17T08:12', editorId: 'u2', creatorId: 'u2',
      note: '統一瑞穗，請於三天內飲用完畢' },
    { id: 'i02', name: '雞蛋 10入', nameEn: 'Eggs 10-pack', scope: 'family', category: 'food',
      location: '冰箱 蛋盒', locationEn: 'Fridge · Egg tray',
      status: 'active', expireAt: '2026-05-02', purchasedAt: '2026-04-10',
      updatedAt: '2026-04-10T18:02', editorId: 'u1', creatorId: 'u1' },
    { id: 'i03', name: '普拿疼', nameEn: 'Paracetamol', scope: 'family', category: 'med',
      location: '客廳 藥櫃', locationEn: 'Living · Medicine cabinet',
      status: 'active', expireAt: '2027-01-15', purchasedAt: '2025-12-01',
      updatedAt: '2025-12-01T10:24', editorId: 'u1', creatorId: 'u1' },
    { id: 'i04', name: '洗衣精', nameEn: 'Laundry detergent', scope: 'family', category: 'clean',
      location: '陽台 洗衣機旁', locationEn: 'Balcony · Washer',
      status: 'active', expireAt: null, purchasedAt: '2026-03-10',
      updatedAt: '2026-03-10T12:00', editorId: 'u2', creatorId: 'u2' },
    { id: 'i05', name: '備用 HDMI 線', nameEn: 'Spare HDMI cable', scope: 'family', category: '3c',
      location: '書房 抽屜 2', locationEn: 'Study · Drawer 2',
      status: 'active', expireAt: null, purchasedAt: '2025-08-20',
      updatedAt: '2025-08-20T20:00', editorId: 'u3', creatorId: 'u3' },
    { id: 'i06', name: '白吐司', nameEn: 'White bread', scope: 'family', category: 'food',
      location: '廚房 麵包櫃', locationEn: 'Kitchen · Bread box',
      status: 'expired', expireAt: '2026-04-16', purchasedAt: '2026-04-12',
      updatedAt: '2026-04-17T09:00', editorId: 'u4', creatorId: 'u1' },
    { id: 'i07', name: '戶口名簿', nameEn: 'Household registration', scope: 'family', category: 'doc',
      location: '主臥 保險箱', locationEn: 'Master bedroom · Safe',
      status: 'active', expireAt: null, purchasedAt: null,
      updatedAt: '2025-05-01T14:00', editorId: 'u1', creatorId: 'u1' },
    { id: 'i08', name: '優酪乳 四入', nameEn: 'Yogurt drink x4', scope: 'family', category: 'food',
      location: '冰箱 下層', locationEn: 'Fridge · Lower shelf',
      status: 'expiring', expireAt: '2026-04-22', purchasedAt: '2026-04-14',
      updatedAt: '2026-04-14T19:30', editorId: 'u3', creatorId: 'u3' },
    { id: 'i09', name: '維他命 C', nameEn: 'Vitamin C', scope: 'personal', category: 'personal',
      location: '我的房間 書桌', locationEn: 'My room · Desk',
      status: 'active', expireAt: '2026-08-01', purchasedAt: '2026-02-01',
      updatedAt: '2026-02-01T10:00', editorId: 'u1', creatorId: 'u1',
      private: true },
    { id: 'i10', name: '面膜', nameEn: 'Face mask sheets', scope: 'personal', category: 'personal',
      location: '浴室 個人抽屜', locationEn: 'Bathroom · Personal drawer',
      status: 'active', expireAt: '2026-11-10', purchasedAt: '2026-04-02',
      updatedAt: '2026-04-02T22:15', editorId: 'u1', creatorId: 'u1',
      private: true },
    { id: 'i11', name: '舊手機 (iPhone 13)', nameEn: 'Old iPhone 13', scope: 'family', category: '3c',
      location: '儲藏室 箱 A', locationEn: 'Storage · Box A',
      status: 'finished', expireAt: null, purchasedAt: '2022-09-20',
      updatedAt: '2026-01-10T11:00', editorId: 'u1', creatorId: 'u1' },
    { id: 'i12', name: '過期優格', nameEn: 'Old yogurt', scope: 'family', category: 'food',
      location: '冰箱', locationEn: 'Fridge',
      status: 'discarded', expireAt: '2026-03-28', purchasedAt: '2026-03-15',
      updatedAt: '2026-04-01T07:00', editorId: 'u2', creatorId: 'u2' },
  ];

  const family = {
    id: 'FM-7X4K-2P',
    name: '陳家小窩',
    createdAt: '2024-06-10',
    ownerId: 'u1',
    memberInvitePolicy: 'owner-only',    // 'owner-only' | 'any-member'
    memberApprovePolicy: 'owner-only',   // 'owner-only' | 'any-member'
    expireNoticeDays: 7,
  };

  const notifications = [
    { id: 'n1', type: 'expiring', itemId: 'i01', text: '鮮奶 1L 將在 6 天後到期',        time: '今天 08:12', actorId: 'system' },
    { id: 'n2', type: 'added',    itemId: 'i08', text: '林美玲 剛新增了「優酪乳 四入」', time: '昨天 19:30', actorId: 'u3' },
    { id: 'n3', type: 'expired',  itemId: 'i06', text: '白吐司 已過期，請確認是否丟棄',  time: '今天 09:00', actorId: 'system' },
    { id: 'n4', type: 'join',                    text: '阿姨 申請加入家庭群組',          time: '2 小時前',   actorId: 'u?' },
  ];

  return { users, me, categories, items, family, notifications };
})();
