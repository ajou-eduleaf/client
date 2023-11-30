type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

const BASE_API_URL = 'http://localhost:8080/api';

async function fetchData<T> (url: string, method: FetchMethod, payload?: any): Promise<T> {
    let request;
    let response;
	
    try {
        request = await fetch(`${BASE_API_URL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        response = await request.json() as T;
    } catch (e) {
        console.error(e);
        throw e;
    }
	
    return response;
}

export { fetchData, BASE_API_URL };
