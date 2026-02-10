// Claude Theme Test File - JavaScript/TypeScript

// Import statements
import React, { useState, useEffect } from 'react';
import { helper, CONSTANT_VALUE } from './utils';

// Constants and enums
const MAX_ITEMS = 100;
const API_URL = 'https://api.example.com';

enum Status {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

// Interface and type definitions
interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

type UserRole = 'admin' | 'user' | 'guest';

// Class definition
class DataService {
  private baseUrl: string;
  
  constructor(url: string) {
    this.baseUrl = url;
  }
  
  async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

// Function with JSDoc
/**
 * Calculates the factorial of a number
 * @param {number} n - The input number
 * @returns {number} The factorial result
 */
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// React component with hooks
const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    // Async effect
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchUserDetails(user.id);
        setData(result);
      } catch (error) {
        console.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user.id]);
  
  // Template literals and JSX
  return (
    <div className="user-profile">
      <h1>{`Welcome, ${user.name}!`}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <span className="email">{user.email}</span>
          <span className="status">Active: {user.isActive ? 'Yes' : 'No'}</span>
        </div>
      )}
    </div>
  );
};

// Arrow function with destructuring
const processUsers = ({ users, filter }: { users: User[], filter?: string }) => {
  return users
    .filter(u => !filter || u.name.includes(filter))
    .map(({ id, name, email }) => ({
      id,
      displayName: name.toUpperCase(),
      contact: email.toLowerCase(),
    }));
};

// Decorators (TypeScript)
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with args:`, args);
    return original.apply(this, args);
  };
}

// Regular expressions
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /\d{3}-\d{3}-\d{4}/;

// Promises and async/await
async function fetchUserDetails(userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          roles: ['user'],
          isActive: true,
        });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

// Export statements
export { UserProfile, DataService, processUsers };
export default factorial;