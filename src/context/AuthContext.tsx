import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RoleType, Permission } from '../types';
import { initialUsers } from '../data/initialData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  activeRole: RoleType | null;
  login: (username: string, password?: string) => boolean;
  loginAsDemoUser: (userId: string) => void;
  quickLoginAsRole: (role: RoleType) => void;
  logout: () => void;
  switchRole: (role: RoleType) => void;
  setActiveRole: (role: RoleType) => void;
  hasPermission: (permission: Permission | string) => boolean;
  hasAnyRole: (roles: RoleType[]) => boolean;
  availableUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Granular RBAC Permissions Table per Role (Requirement 20)
const ROLE_PERMISSIONS: Record<RoleType, Permission[]> = {
  SUPER_ADMIN: [
    'student.view', 'student.create', 'student.edit', 'student.delete',
    'teacher.view', 'teacher.manage',
    'journal.view', 'journal.create', 'journal.edit',
    'attendance.view', 'attendance.create', 'attendance.manage',
    'grade.view', 'grade.create', 'grade.edit',
    'point.view', 'point.create', 'point.edit',
    'letter.view', 'letter.create', 'letter.approve', 'letter.sign',
    'graduation.view', 'graduation.manage', 'graduation.publish',
    'cms.view', 'cms.create', 'cms.edit', 'cms.publish',
    'system.manage', 'audit.view'
  ],
  ADMIN: [
    'student.view', 'student.create', 'student.edit',
    'teacher.view', 'teacher.manage',
    'journal.view',
    'attendance.view', 'attendance.manage',
    'grade.view',
    'point.view', 'point.create', 'point.edit',
    'letter.view', 'letter.create',
    'graduation.view', 'graduation.manage',
    'cms.view', 'cms.create', 'cms.edit', 'cms.publish',
    'system.manage', 'audit.view'
  ],
  KEPALA_SEKOLAH: [
    'student.view', 'teacher.view',
    'journal.view',
    'attendance.view',
    'grade.view',
    'point.view',
    'letter.view', 'letter.approve', 'letter.sign',
    'graduation.view', 'graduation.manage', 'graduation.publish',
    'cms.view',
    'audit.view'
  ],
  TU: [
    'student.view', 'student.create', 'student.edit',
    'teacher.view',
    'attendance.view', 'attendance.create', 'attendance.manage',
    'letter.view', 'letter.create',
    'graduation.view', 'graduation.manage',
    'cms.view', 'cms.create', 'cms.edit',
    'point.view', 'point.create'
  ],
  GURU: [
    'student.view',
    'journal.view', 'journal.create', 'journal.edit',
    'attendance.view', 'attendance.create',
    'grade.view', 'grade.create', 'grade.edit',
    'point.view', 'point.create',
    'letter.view'
  ],
  WALI_KELAS: [
    'student.view',
    'journal.view',
    'attendance.view',
    'grade.view',
    'point.view', 'point.create',
    'graduation.view'
  ],
  SISWA: [
    'attendance.view',
    'grade.view',
    'point.view',
    'graduation.view'
  ],
  ORANG_TUA: [
    'attendance.view',
    'grade.view',
    'point.view',
    'graduation.view'
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('school_platform_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('school_platform_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('school_platform_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('school_platform_active_user');
    }
  }, [user]);

  const activeRole: RoleType | null = user ? user.activeRole : null;

  const login = (username: string, _password?: string): boolean => {
    const found = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() || u.email.toLowerCase() === username.trim().toLowerCase()
    );
    if (found) {
      setUser({
        ...found,
        activeRole: found.roles[0]
      });
      return true;
    }
    return false;
  };

  const loginAsDemoUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setUser({
        ...found,
        activeRole: found.roles[0]
      });
    }
  };

  const quickLoginAsRole = (role: RoleType) => {
    const found = users.find((u) => u.roles.includes(role)) || users[0];
    if (found) {
      setUser({
        ...found,
        activeRole: role
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: RoleType) => {
    if (user) {
      setUser({
        ...user,
        activeRole: newRole
      });
    }
  };

  const setActiveRole = (newRole: RoleType) => {
    switchRole(newRole);
  };

  const hasPermission = (permission: Permission | string): boolean => {
    if (!user || !user.activeRole) return false;
    if (user.activeRole === 'SUPER_ADMIN') return true;
    
    // Check direct match
    const permissions = ROLE_PERMISSIONS[user.activeRole] || [];
    if (permissions.includes(permission as Permission)) return true;

    // Check alias maps
    const aliasMap: Record<string, Permission[]> = {
      'e-surat:read': ['letter.view'],
      'e-surat:create': ['letter.create'],
      'e-surat:approve': ['letter.approve'],
      'e-surat:sign': ['letter.sign'],
      'e-surat:revoke': ['letter.sign', 'letter.approve'],
      'e-jurnal:read': ['journal.view'],
      'e-jurnal:create': ['journal.create'],
      'e-presensi:read': ['attendance.view'],
      'e-presensi:generate_qr': ['attendance.manage', 'attendance.create'],
      'e-poin:read': ['point.view'],
      'e-poin:create': ['point.create'],
      'e-kelulusan:read': ['graduation.view'],
      'e-kelulusan:manage': ['graduation.manage'],
      'cms:read': ['cms.view'],
      'cms:edit': ['cms.edit', 'cms.create', 'system.manage']
    };

    const mapped = aliasMap[permission];
    if (mapped) {
      return mapped.some((p) => permissions.includes(p));
    }

    return false;
  };

  const hasAnyRole = (allowedRoles: RoleType[]): boolean => {
    if (!user) return false;
    return user.roles.some((r) => allowedRoles.includes(r));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activeRole,
        login,
        loginAsDemoUser,
        quickLoginAsRole,
        logout,
        switchRole,
        setActiveRole,
        hasPermission,
        hasAnyRole,
        availableUsers: users
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
