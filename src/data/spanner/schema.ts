export const SPANNER_SCHEMA = `
CREATE TABLE products (
    id STRING(MAX) NOT NULL,
    title STRING(MAX),
    price INT64,
    image_url STRING(MAX),
) PRIMARY KEY (id);

CREATE TABLE inventory (
    product_id STRING(MAX) NOT NULL,
    quantity INT64,
) PRIMARY KEY (product_id);

CREATE TABLE checkouts (
    id STRING(MAX) NOT NULL,
    status STRING(MAX),
    data JSON,
) PRIMARY KEY (id);

CREATE TABLE orders (
    id STRING(MAX) NOT NULL,
    data JSON,
) PRIMARY KEY (id);

CREATE TABLE request_logs (
    id INT64 NOT NULL,
    method STRING(MAX),
    url STRING(MAX),
    checkout_id STRING(MAX),
    payload JSON,
    timestamp TIMESTAMP,
) PRIMARY KEY (id);

CREATE TABLE idempotency_keys (
    key STRING(MAX) NOT NULL,
    request_hash STRING(MAX),
    response_status INT64,
    response_body STRING(MAX),
) PRIMARY KEY (key);
`;
