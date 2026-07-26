from fastapi.testclient import TestClient
from baif_translation.main import app

client = TestClient(app)


def test_upload_and_list_jobs():
    response = client.post(
        '/api/upload',
        files={'file': ('sample.txt', b'Hello world', 'text/plain')},
        data={
            'source_language': 'Hindi (auto-detect)',
            'target_language': 'Marathi',
            'output_formats': ['txt', 'audio']
        }
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload['message'] == 'Upload received successfully'
    assert 'job_id' in payload

    jobs_response = client.get('/api/jobs')
    assert jobs_response.status_code == 200
    jobs_payload = jobs_response.json()
    assert len(jobs_payload['jobs']) >= 1


def test_get_job_not_found():
    response = client.get('/api/jobs/not-found')
    assert response.status_code == 404
