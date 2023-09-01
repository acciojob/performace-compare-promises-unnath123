 const apiEndpoints = [
	"https://jsonplaceholder.typicode.com/todos/1",
	"https://jsonplaceholder.typicode.com/todos/2",
	"https://jsonplaceholder.typicode.com/todos/3",
	"https://jsonplaceholder.typicode.com/todos/4",
	"https://jsonplaceholder.typicode.com/todos/5",
	"https://jsonplaceholder.typicode.com/todos/6",
	"https://jsonplaceholder.typicode.com/todos/7",
	"https://jsonplaceholder.typicode.com/todos/8",
	"https://jsonplaceholder.typicode.com/todos/9",
	"https://jsonplaceholder.typicode.com/todos/10",
  ];
	


async function fetchDataWithPromiseAll() {
	const startTime = performance.now();
	const responses = await Promise.all(apiEndpoints.map(endpoint => fetch(endpoint)));
	const data = await Promise.all(responses.map(response => response.json()));
	const endTime = performance.now();
	return { data, timeTaken: endTime - startTime };
}

async function fetchDataWithPromiseAny() {
	const startTime = performance.now();
	const promises = apiEndpoints.map(endpoint => fetch(endpoint).then(response => response.json()));
	const data = await Promise.any(promises);
	const endTime = performance.now();
	return { data, timeTaken: endTime - startTime };
}

async function displayResults() {
	try {
		const promiseAllResult = await fetchDataWithPromiseAll();
		const promiseAnyResult = await fetchDataWithPromiseAny();

		const resultsDiv1 = document.getElementById('output-all');
		const resultsDiv2 = document.getElementById('output-any');

		resultsDiv1.innerText=promiseAllResult.timeTaken;
		resultsDiv2.innerText=promiseAnyResult.timeTaken;
		;
	} catch (error) {
		console.error(error);
		document.getElementById('results').innerHTML = '<p>Error fetching data.</p>';
	}
}
displayResults()