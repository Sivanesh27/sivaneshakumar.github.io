/*
  Copyright (C) 2025 sivaneshakumar

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License version 3
  as published by the Free Software Foundation.

  This program is distributed WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
  for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see https://www.gnu.org/licenses/
*/

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    subject: e.target.subject.value,
    message: e.target.message.value,
  };

  try {
    const response = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.message);
    if (response.ok) {
      e.target.reset();
    }
  } catch (err) {
    alert('Error sending message, please try again.');
    console.error(err);
  }
});
