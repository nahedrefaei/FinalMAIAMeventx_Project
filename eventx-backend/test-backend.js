import fetch from 'node-fetch';

async function testBackend() {
  try {
    // Test basic endpoint
    const basicResponse = await fetch('http://localhost:3001/');
    const basicResult = await basicResponse.json();
    console.log('Basic endpoint result:', basicResult);

    // Test register
    const registerResponse = await fetch('http://localhost:3001/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123'
      })
    });
    
    if (!registerResponse.ok) {
      console.log('Register failed with status:', registerResponse.status);
      const errorText = await registerResponse.text();
      console.log('Error response:', errorText);
      return;
    }
    
    const registerResult = await registerResponse.json();
    console.log('Register result:', registerResult);

    // Test login
    const loginResponse = await fetch('http://localhost:3001/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      })
    });
    
    if (!loginResponse.ok) {
      console.log('Login failed with status:', loginResponse.status);
      const errorText = await loginResponse.text();
      console.log('Error response:', errorText);
      return;
    }
    
    const loginResult = await loginResponse.json();
    console.log('Login result:', loginResult);

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testBackend();
