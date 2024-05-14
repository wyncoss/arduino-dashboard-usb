const url = 'https://arduinousbapi.azurewebsites.net/api/data';

const datatable = document.getElementById('data');

const showData = () => {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      datatable.innerHTML = '';

      if (data.length === 0) {
        const noData = document.createElement('p');
        noData.style.marginTop = '45px';
        noData.textContent = 'No hay datos 😔';
        datatable.appendChild(noData);
      } else {
        data.forEach((res) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td style="width: 118px">${res.id}</td>
            <td style="width: 393px">${res.temperature}</td>
            <td style="width: 316px">${res.humidity}</td>
            <td style="display: flex; justify-content: center; align-items:center; gap: 5px; ${
              window.innerWidth < 1200 ? 'width: 150px;' : null
            }">${res.boolean.data[0]}<p class="${
            res.boolean.data[0] === 1 ? 'text-warning' : 'text-secondary'
          }" style="margin: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16">
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"></path>
            </svg>
        </p></td>
            
            `;
          row.id = `data-${res.id}`;
          datatable.appendChild(row);
        });
      }
    })
    .catch((error) => console.log(`Error al cargar los datos: ${error}`));
};

const cleanHTML = () => {
  while (datatable.firstChild) {
    datatable.removeChild(datatable.firstChild);
  }
};

const loader = () => {
  cleanHTML();
  const divLoader = document.createElement('div');
  divLoader.classList.add('loader');

  datatable.appendChild(divLoader);
};

loader();

showData();
