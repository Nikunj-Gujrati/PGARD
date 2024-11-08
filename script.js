let jsonData = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('./assets/apiDatabase.json')
    .then(response => response.json())
    .then(data => {
      console.log(data)
        jsonData = data;
    })
    .catch(error => console.error('Error loading JSON data:', error));
});

const searchInput = document.querySelector('.search input[type="text"]');
const checkboxes = document.querySelectorAll('.check-box input[type="checkbox"]');
const yearDropdown = document.getElementById('year');

// Listen to search input, checkboxes, and year dropdown changes
searchInput.addEventListener('input', filterData);
checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterData));
yearDropdown.addEventListener('change', filterData);

function filterData() {
  const searchText = searchInput.value.toLowerCase();
  const selectedYear = parseInt(yearDropdown.value, 10);
  const selectedFilters = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id.replace('check', '').toLowerCase());

  const filteredData = jsonData.flatMap(stateData => {
    const filteredYears = stateData.data.filter(yearData => {
      // Filter by year, if specified
      if (selectedYear && yearData.year !== selectedYear) return false;

      // Filter by search text in state name
      if (searchText && !stateData.state.toLowerCase().includes(searchText)) return false;

      // Check if all selected filters are available in the yearData
      for (const filter of selectedFilters) {
        if (!yearData[filter] || yearData[filter] === "") return false;
      }
      return true;
    });

    return filteredYears.length ? [{ ...stateData, data: filteredYears }] : [];
  });

  displayResults(filteredData, selectedFilters);
}

function displayResults(data, selectedFilters) {
  const searchContent = document.querySelector('.search-content');
  searchContent.innerHTML = '';

  if (data.length === 0) {
    searchContent.innerHTML = '<p>No results found.</p>';
    return;
  }

  data.forEach(state => {
    const stateContainer = document.createElement('div');
    stateContainer.classList.add('state-container');
    stateContainer.innerHTML = `<h3>${state.state.replace('_', ' ')}</h3>
                                <img src="${state.image.state_image}" alt="${state.state}" class="state-image">
                                <p><strong>Famous For:</strong> ${state.information.famous_for}</p>
                                <p><strong>Nickname:</strong> ${state.information.nickname}</p>
                                <p><strong>Additional Info:</strong> ${state.information.additional_info}</p>`;

    state.data.forEach(yearData => {
      const yearDataDiv = document.createElement('div');
      yearDataDiv.classList.add('year-data');
      
      let detailsHTML = `<p><strong>Year:</strong> ${yearData.year}</p>`;
      if (selectedFilters.includes('population')) detailsHTML += `<p><strong>Population:</strong> ${yearData.population}</p>`;
      if (selectedFilters.includes('hospitals')) detailsHTML += `<p><strong>Hospitals:</strong> ${yearData.hospitals}</p>`;
      if (selectedFilters.includes('schools')) detailsHTML += `<p><strong>Schools:</strong> ${yearData.schools}</p>`;
      if (selectedFilters.includes('economy')) detailsHTML += `<p><strong>Economy:</strong> ${yearData.economy}</p>`;
      
      yearDataDiv.innerHTML = detailsHTML;
      stateContainer.appendChild(yearDataDiv);
    });

    searchContent.appendChild(stateContainer);
  });
}
