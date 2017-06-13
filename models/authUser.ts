import { Timestamps } from './../../core/models/date';

export interface Permission {
  object: 'Permission';
  name: string;
  display_name: string;
  description: string;
}

export interface Role {
  object: 'Role';
  name: string;
  display_name: string;
  description: string;
  permissions: { data: Array<Permission> }
}

export class AuthUser {
  id: number;
  visitor_id: number;
  social_id: string;
  token: { token };
  name: string;
  nickname: string;
  gender: string;
  email: string;
  roles: { data: Array<Role> };
  birth: number;
  confirmed: boolean;
  social_auth_provider: string;
  social_avatar: Object;
  created_at: Timestamps;

  /**
   * Check if user has a specific role.
   * @param string role 
   */
  public hasRole(role: string): boolean {
    let hasTheRole: boolean = false;

    this.roles && this.roles.data.forEach(item => {
      if (item.name === role) {
        hasTheRole = true;
        return;
      }
    });

    return hasTheRole;
  }

  /**
   * Chek if user has at least one of the given roles.
   * @param Array<string> roles 
   */
  public hasAnyRole(roles: Array<string>): boolean {
    let hasTheRole: boolean = false;

    this.roles && this.roles.data.forEach(item => {
      if (roles.indexOf(item.name) > -1) {
        hasTheRole = true;
        return;
      }
    });

    return hasTheRole;
  }

  /**
   * Check if user has all the given roles.
   * @param Array<roles> roles 
   */
  public hasAllRoles(roles: Array<string>): boolean {
    let rolesFound: number = 0;

    this.roles && this.roles.data.forEach(item => {
      if (roles.indexOf(item.name) > -1) {
        rolesFound++;
      }
    });

    return rolesFound === roles.length;
  }

  /**
   * Check if user has specific permission.
   * @param string permission 
   */
  public userCan(permission: string): boolean {
    let hasPermission: boolean = false;

    this.roles && this.roles.data.forEach(role => {
      role.permissions.data.forEach(perm => {
        if (permission === perm.name) {
          hasPermission = true;
          return;
        }
      });

      // permission already found, finish the loop
      if (hasPermission) {
        return;
      }
    });

    return hasPermission;
  }

  /**
   * Check if user has any of the given permissions.
   * @param Array<string> permissions 
   */
  public userCanAny(permissions: Array<string>): boolean {
    let hasPermission: boolean = false;

    this.roles && this.roles.data.forEach(role => {
      role.permissions.data.forEach(perm => {
        if (permissions.indexOf(perm.name) > -1) {
          hasPermission = true;
          return;
        }
      });

      // permission already found, finish the loop
      if (hasPermission) {
        return;
      }
    });

    return hasPermission;
  }

  /**
   * Check if user has all the given permissions.
   * @param Array<string> permissions 
   */
  public userCanAll(permissions: Array<string>): boolean {
    let permissionsFound: number = 0;

    this.roles && this.roles.data.forEach(role => {
      role.permissions.data.forEach(perm => {
        if (permissions.indexOf(perm.name) > -1) {
          permissionsFound++;
        }
      });
    });

    return permissionsFound === permissions.length;
  }
}