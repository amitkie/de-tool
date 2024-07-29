export const buySubscription = async (payload) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/payments/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  };
  