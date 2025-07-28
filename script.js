let orders = JSON.parse(localStorage.getItem('orders')) || [];
const selectedList = document.getElementById('selectedList');
const totalPriceEl = document.getElementById('totalPrice');


function updateOrderUI() {
    selectedList.innerHTML = '';
    let total = 0;

    orders.forEach((order, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${order.name} x${order.qty} - #${(order.qty * order.price).toFixed(2)}
    <button class="remove-btn" onclick="removeItem(${index})">×</button>`;
    
    selectedList.appendChild(li);
    total += order.qty * order.price;
});



totalPriceEl.textContent = total.toFixed(2);
localStorage.setItem('orders', JSON.stringify(orders));
}


function addToOrder(name, price, inputId) {
    const qtyInput = document.getElementById(inputId);
   const qty = parseInt(qtyInput.value);
   if (!qty || qty < 1) return;
    const existing = orders.find(item => item.name === name);
    if (existing) {
        existing.qty += qty;
    } else {
        orders.push({ name, price, qty });
    }
    updateOrderUI()

    qtyInput.value = 1;

}




function removeItem(index) {
    orders.splice(index, 1);
    updateOrderUI();
}

function clearAll() {
      orders = [];
      updateOrderUI();

}


function printOrder() {
    if (orders.length === 0) {
    alert("You have no items in your order to print.");
    return;
  }
    const sidebar = document.querySelector('.sidebarP').cloneNode(true);
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Order</title></head><body>');
    printWindow.document.write(sidebar.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    clearAll();
    

const prepTime = Math.floor(Math.random() * 11) + 10; // 10–20 minutes
setTimeout(() => {
    alert(`Dear customer! Your orders will be ready in approximately ${prepTime} minutes.`);
    setTimeout(() => {
    alert("Thank you for your patronage!");
     }, 2000);
   }, 1000);
 }


 window.onload = updateOrderUI;