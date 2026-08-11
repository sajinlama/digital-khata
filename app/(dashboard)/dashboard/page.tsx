import React from 'react';

export default function Dashboard() {
  const transactions = [
    { id: 1, name: 'Ram Bahadur', time: 'Today, 10:30 AM', amount: '2,500', type: 'give' },
    { id: 2, name: 'Sita Sharma', time: 'Yesterday, 4:15 PM', amount: '5,000', type: 'take' },
    { id: 3, name: 'Hari Thapa', time: 'Yesterday, 2:00 PM', amount: '1,200', type: 'give' },
    { id: 4, name: 'Rita Gurung', time: 'Oct 12, 11:45 AM', amount: '850', type: 'give' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1e1b12] font-sans">
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 h-16 border-b border-[#c5c6cf] bg-[#fff9ee] sticky top-0 z-40">
        <h1 className="font-serif text-2xl font-bold text-[#1e1b12]">Overview</h1>
        <div className="flex items-center gap-3">
          <button className="text-[#45464e] hover:bg-[#efe7d8] p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <img
            className="w-8 h-8 rounded-full border border-[#c5c6cf] object-cover"
            alt="User profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdzDgi8JYDE0y2HUvZubjU9Hg6uu8Hng3WgiZMmFAID8TNrnl6BJWReAgxLbh2k2XBxW4JxWxm4n8fQCdWAOuPgATTQkQ3XsDcvQNsGrmoJKzCUPeoqQ_Rw2P5CeovJ8Dbd2wBwQu3uFI1ZOu0yhrQ_vobTp_CAfb86_z8LOY9A4GHnk080RaNQtarqwiUibpb84o8Xy69dXCWAunGiDh-ZKIuxGNezKJhRQZQZyov8flHbTWxFXvNYA"
          />
        </div>
      </header>

      {/* Main Container */}
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        {/* Summary Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Total Outstanding */}
          <div className="bg-[#fff9ee] rounded p-4 border border-[#DDD6C7] shadow-sm flex flex-col justify-between min-h-[140px] hover:bg-[#faf3e3] transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-base text-[#45464e]">
                Total Outstanding <br />
                <span className="text-xs text-[#75777f]">दिने (Give)</span>
              </span>
              <span className="material-symbols-outlined text-[#ba1a1a]">arrow_upward</span>
            </div>
            <div className="font-mono text-2xl font-semibold tracking-tight text-[#ba1a1a] mt-2">
              Rs. 45,200
            </div>
          </div>

          {/* Active Customers */}
          <div className="bg-[#fff9ee] rounded p-4 border border-[#DDD6C7] shadow-sm flex flex-col justify-between min-h-[140px] hover:bg-[#faf3e3] transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-base text-[#45464e]">
                Active Customers <br />
                <span className="text-xs text-[#75777f]">ग्राहकहरु</span>
              </span>
              <span className="material-symbols-outlined text-[#041534]">group</span>
            </div>
            <div className="font-mono text-2xl font-semibold tracking-tight text-[#1e1b12] mt-2">
              128
            </div>
          </div>

          {/* Today's Collection */}
          <div className="bg-[#fff9ee] rounded p-4 border border-[#DDD6C7] shadow-sm flex flex-col justify-between min-h-[140px] hover:bg-[#faf3e3] transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-base text-[#45464e]">
                Today's Collection <br />
                <span className="text-xs text-[#75777f]">लिने (Take)</span>
              </span>
              <span className="material-symbols-outlined text-[#386a20]">arrow_downward</span>
            </div>
            <div className="font-mono text-2xl font-semibold tracking-tight text-[#386a20] mt-2">
              Rs. 8,450
            </div>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Recent Activity Section */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#1e1b12]">Recent Activity</h2>
            <div className="bg-[#fff9ee] rounded border border-[#DDD6C7] shadow-sm overflow-hidden">
              <div className="divide-y divide-[#c5c6cf]">
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 flex items-center justify-between hover:bg-[#faf3e3] transition-colors min-h-[64px] ${
                      item.type === 'give'
                        ? 'border-l-4 border-l-[#ba1a1a]'
                        : 'border-l-4 border-l-[#386a20]'
                    }`}
                  >
                    <div>
                      <div className="text-base font-medium text-[#1e1b12]">{item.name}</div>
                      <div className="text-xs text-[#45464e]">{item.time}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`font-mono text-2xl font-semibold tracking-tight ${
                          item.type === 'give' ? 'text-[#ba1a1a]' : 'text-[#386a20]'
                        }`}
                      >
                        {item.amount}
                      </div>
                      <button className="text-[#45464e] hover:text-[#041534] transition-colors p-1">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center border-t border-[#c5c6cf] bg-white">
                <button className="text-xs text-[#041534] hover:underline font-medium">
                  View All Transactions
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-4 sticky top-[100px]">
            <h2 className="font-serif text-xl font-semibold text-[#1e1b12]">Quick Actions</h2>
            <div className="bg-[#fff9ee] rounded p-4 border border-[#DDD6C7] shadow-sm space-y-4">
              <button className="w-full bg-[#feb64e] hover:bg-[#eab04a] text-[#714800] rounded min-h-[48px] flex flex-col justify-center items-center py-2 transition-colors shadow-[0_2px_10px_rgba(4,21,52,0.1)]">
                <span className="font-serif text-[18px] font-semibold">Add Give (Credit)</span>
                <span className="text-xs opacity-80">दिने रकम थप्नुहोस्</span>
              </button>
              <button className="w-full border-2 border-[#041534] text-[#041534] hover:bg-[#d9e2ff] transition-colors rounded min-h-[48px] flex flex-col justify-center items-center py-2">
                <span className="font-serif text-[18px] font-semibold">Add Take (Payment)</span>
                <span className="text-xs opacity-80">लिने रकम थप्नुहोस्</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}