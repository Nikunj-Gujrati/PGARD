let jsonData = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('./assets/apiDatabase.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data;
    })
    .catch(error => console.error('Error loading JSON data:', error));
});

const searchInput = document.querySelector('#search-input');
const checkboxes = document.querySelectorAll('.filter-checkbox');
const yearDropdown = document.getElementById('year-dropdown');
const searchContent = document.querySelector('.search-content');
const searchButton = document.querySelector('#search-button');

// Listen to search input, checkboxes, and year dropdown changes
searchInput.addEventListener('input', filterData);
// searchButton.addEventListener('click', filterData);

checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterData));
yearDropdown.addEventListener('change', filterData);

function filterData() {
  const searchText = searchInput.value.toLowerCase();
  const selectedYear = yearDropdown.value ? parseInt(yearDropdown.value, 10) : null;

  // If search input is empty, clear the search content and return
  if (searchText === '') {
    searchContent.innerHTML = '';
    return;
  }
  
  // Collect the selected filters (checkboxes that are checked)
  const selectedFilters = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id.replace('check', '').toLowerCase());  // This line gets filter names

  const filteredData = jsonData.flatMap(stateData => {
    const filteredYears = stateData.data.filter(yearData => {
      // Filter by year, if specified
      if (selectedYear && yearData.year !== selectedYear) return false;

      // Filter by search text in state name
      if (searchText && !stateData.state.toLowerCase().includes(searchText)) return false;

      // Filter by selected filters (checkboxes)
      if (selectedFilters.length > 0) {
        for (let filter of selectedFilters) {
          if (filter === 'population' && !yearData.population) return false;
          if (filter === 'hospitals' && !yearData.hospitals) return false;
          if (filter === 'schools' && !yearData.schools) return false;
          if (filter === 'economy' && !yearData.economy) return false;
        }
      }

      return true;
    });

    return filteredYears.length ? { ...stateData, data: filteredYears } : [];
  });

  updateUI(filteredData, selectedFilters);
}
function updateUI(filteredData, selectedFilters) {

  if (!filteredData || filteredData.length === 0) {
    searchContent.innerHTML = '<p>No results found.</p>';
    return;
  }

  searchContent.innerHTML = ''; // Clear previous content

  if (filteredData.length === 0) {
    searchContent.innerHTML = '<p>No results found.</p>';
    return;
  }

  filteredData.forEach(stateData => {
    stateData.data.forEach(yearData => {
      const stateDiv = document.createElement('div');
      stateDiv.classList.add('state-data');

      let additionalInfo = '';
      if (selectedFilters.includes('population')) {
        additionalInfo += `<p>Population: ${yearData.population || 'N/A'}</p>`;
      }
      if (selectedFilters.includes('hospitals')) {
        additionalInfo += `<p>Hospitals: ${yearData.hospitals || 'N/A'}</p>`;
      }
      if (selectedFilters.includes('schools')) {
        additionalInfo += `<p>Schools: ${yearData.schools || 'N/A'}</p>`;
      }
      if (selectedFilters.includes('economy')) {
        additionalInfo += `<p>Economy: ${yearData.economy || 'N/A'}</p>`;
      }

      stateDiv.innerHTML = `
        <h3>${stateData.state.replace('_', ' ')}</h3>
        <p id="year-data">Year: ${yearData.year}</p>
        ${additionalInfo}
        <p id="info-data">Info: ${stateData.information.famous_for}</p>
        <p id="nick-data">Nickname: ${stateData.information.nickname}</p>
        <p id="additional-data">Additional Info: ${stateData.information.additional_info}</p>
        <img src="${stateData.image.state_image}" alt="${stateData.state}">
      `;

      searchContent.appendChild(stateDiv);
    });
  });
}

