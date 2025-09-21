// ที่ไฟล์: services/authService.js

// เราจะ export เป็นฟังก์ชันเดี่ยวๆ แทนคลาส เพื่อให้ใช้ง่ายใน App Router
export const AuthService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      // ดึงข้อมูลผู้ใช้ทั้งหมดจาก localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // ค้นหาผู้ใช้ด้วยอีเมล
      const user = users.find(u => u.email === email);

      if (user && user.password === password) {
        // ถ้าเจอและรหัสผ่านถูกต้อง ให้เก็บข้อมูลผู้ใช้ที่ login อยู่ใน session
        // (เราใช้ localStorage จำลอง session)
        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
        console.log('Login successful for:', user.email);
        resolve({ name: user.name, email: user.email });
      } else {
        // ถ้าไม่เจอ หรือรหัสผ่านผิด
        console.error('Login failed: Invalid email or password');
        reject(new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง'));
      }
    });
  },

  logout: () => {
    // ลบข้อมูลผู้ใช้ที่ login อยู่ออกจาก session
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  },

  getCurrentUser: () => {
    // ดึงข้อมูลผู้ใช้ที่กำลัง login อยู่
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};