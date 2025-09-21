"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// แก้ไข path ตรงนี้ครับ
import { AuthService } from './services/authService'; 

export default function HomePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      // ถ้าไม่มีใคร login อยู่ ให้เด้งกลับไปหน้า login
      router.push('/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.push('/login');
  };

  // ขณะรอโหลดข้อมูลผู้ใช้
  if (!user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>กำลังโหลดข้อมูลผู้ใช้...</p>
        </div>
    );
  }

  // เมื่อมีข้อมูลผู้ใช้แล้ว (โค้ดส่วนแสดงผลเหมือนเดิม)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-10 text-center bg-white border border-gray-200 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">ยินดีต้อนรับสู่หน้าแรก</h1>
        <p className="mt-2 text-lg text-gray-500">คุณเข้าสู่ระบบสำเร็จแล้ว</p>
        
        <div className="p-6 mt-8 text-left bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700">ข้อมูลของคุณ</h2>
          <p className="mt-4 text-gray-600">
            <span className="font-bold">ชื่อ:</span> {user.name}
          </p>
          <p className="mt-2 text-gray-600">
            <span className="font-bold">อีเมล:</span> {user.email}
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 mt-8 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}