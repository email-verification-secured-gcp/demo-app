#!/bin/sh

SECRETS_FILE="/opt/webapp/secrets/secrets.env"

# Check if the secrets file exists
if [ -f "$SECRETS_FILE" ]; then
    # Check if the startup variable is set to true
    if grep -q "startup=true" "$SECRETS_FILE"; then
        echo "Startup is set to true in $SECRETS_FILE"
        exit 0  # Exit with success code
    else
        echo "Startup is not set to true in $SECRETS_FILE"
        exit 1  # Exit with failure code
    fi
else
    echo "Secrets file $SECRETS_FILE not found"
    exit 1  # Exit with failure code
fi