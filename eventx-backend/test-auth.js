// Simple test script for authentication
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:8080/api/v1';

async function testRegister() {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123'
      })
    });
    
    const result = await response.json();
    console.log('Register result:', result);
    return result;
  } catch (error) {
    console.error('Register error:', error);
  }
}

async function testLogin() {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      })
    });
    
    const result = await response.json();
    console.log('Login result:', result);
    return result;
  } catch (error) {
    console.error('Login error:', error);
  }
}

// Run tests
console.log('Testing registration...');
await testRegister();

console.log('\nTesting login...');
await testLogin();
