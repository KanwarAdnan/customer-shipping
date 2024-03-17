document.addEventListener('DOMContentLoaded', function() {
  const customerForm = document.getElementById('customerForm');
  const emailInput = document.getElementById('email');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const fetchCustomersBtn = document.getElementById('fetchCustomers');
  const customerList = document.getElementById('customerList');

  customerForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = {
      email: emailInput.value,
      first_name: firstNameInput.value,
      last_name: lastNameInput.value,
      // Add more fields here
    };

    try {
      const response = await fetch('http://localhost:8000/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      alert('Customer created successfully');
      emailInput.value = '';
      firstNameInput.value = '';
      lastNameInput.value = '';
      // Add logic to reset other fields if needed
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  });

  fetchCustomersBtn.addEventListener('click', async function() {
    try {
      const response = await fetch('http://localhost:8000/customers/');
      const customers = await response.json();
      customerList.innerHTML = '';
      customers.forEach(function(customer) {
        const li = document.createElement('li');
        li.textContent = customer.email;
        // Add logic to display other customer details
        customerList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  });
});
