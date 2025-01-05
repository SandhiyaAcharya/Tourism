const recommendTab = document.getElementById('recommend-tab');
const predictTab = document.getElementById('predict-tab');

const recommendContent = document.getElementById('recommend-content');
const predictContent = document.getElementById('predict-content');

recommendTab.addEventListener('click', (event) => {
    event.preventDefault();
    recommendContent.classList.add('active');
    predictContent.classList.remove('active');
});

predictTab.addEventListener('click', (event) => {
    event.preventDefault();
    predictContent.classList.add('active');
    recommendContent.classList.remove('active');
});

$(document).ready(function () {
    $('#location').select2({
        placeholder: 'Select a location',
        allowClear: true,
        width: '100%' // Ensures the dropdown uses 100% of the available space
    });
});
