document.addEventListener('DOMContentLoaded', async () => {
    const historyBody = document.getElementById('historyBody');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    async function loadHistory() {
        try {
            const response = await fetch('/api/history');
            if (!response.ok) throw new Error('Error');
            const history = await response.json();

            historyBody.innerHTML = '';

            history.forEach(item => {
                const tr = document.createElement('tr');

                const expressionTd = document.createElement('td');
                expressionTd.textContent = item.expression;
                tr.appendChild(expressionTd);

                const resultTd = document.createElement('td');
                resultTd.textContent = item.result;
                tr.appendChild(resultTd);

                historyBody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    await loadHistory();

    // Silme İşlemi
    clearHistoryButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/history', {
                method: 'DELETE'  
            });
            if (!response.ok) throw new Error('Network response was not ok.');

            historyBody.innerHTML = '';

            alert('Başarıyla Silindi.');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});