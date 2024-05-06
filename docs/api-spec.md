# Fake Payment API Specification

<!-- readme header  -->
<div align="center">
  <p align="left">
    <a href=""><strong>Explore the API Documentation »</strong></a>
  </p>
</div>

## Error Codes

### 2XX

| Code        | Explanation                            |
|-------------|----------------------------------------|
| 200         | OK                                     |
| 201         | Created                                |
| 204         | No Content                             |
| 205         | Reset Content                          |
| 206         | Partial Content                        |

# 3XX

| Code        | Explanation                            |
|-------------|----------------------------------------|
| 300         | List of new Location                   |
| 301         | Moved Permanently                      |
| 304         | Not Modifier                           |
| 307         | Temporary Redirect                     |

### 4XX

| Code        | Explanation                            |
|-------------|----------------------------------------|
| 400         | Bad Request / Validation Error         |
| 401         | Unauthorized                           |
| 402         | Payment Required                       |
| 403         | Forbidden                              |
| 404         | Not Found                              |
| 408         | Gone                                   |
| 415         | Unsupported Media Type                 |

### 5XX

| Code        | Explanation                            |
|-------------|----------------------------------------|
| 500         | Internal Server Error                  |
| 503         | Service Unavailable                    |