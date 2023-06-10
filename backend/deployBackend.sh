# Script for releasing Application stack onto AWS Cloudformation

getVar() {
    VAR=$(grep $1 "./configs/dev.env" | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

ARTIFACT_STORE=$(getVar ARTIFACT_STORE);
ARTIFACT_PATH=$(getVar ARTIFACT_PATH);

BACKEND_STACK_NAME=$(getVar BACKEND_STACK_NAME);
AWS_REGION=$(getVar AWS_REGION);
AWS_PROFILE=$(getVar AWS_PROFILE);

echo "[ARTIFACT STORE]: $ARTIFACT_STORE"
echo "[ARTIFACT PATH]: $ARTIFACT_PATH"
echo "[STACK NAME]: $BACKEND_STACK_NAME"
echo "[Region]: $AWS_REGION"
echo "[PROFILE]: $AWS_PROFILE"


# Deploy stack
echo "Packaging..."

cd ./aws

sam package --template-file ./template.yaml \
    --s3-bucket "$ARTIFACT_STORE" \
    --s3-prefix "$ARTIFACT_PATH" \
    --output-template-file ./template-packaged.yaml \
    --region "$AWS_REGION" \
    --profile "$AWS_PROFILE"


echo "Would you like to deploy the stack? ([Y]/n)"

# Read user input
read -r input

# Check if user input is empty
if [ -z "$input" ]; then
    input="Y"
fi

# Check if user input is Y
if [ "$input" = "Y" ] || [ "$input" = "y" ]; then
    echo "Deploying..."
    sam deploy --template-file ./template-packaged.yaml \
        --s3-bucket "$ARTIFACT_STORE" \
        --s3-prefix "$ARTIFACT_PATH" \
        --stack-name $BACKEND_STACK_NAME \
        --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
        --region "$AWS_REGION" \
        --profile "$AWS_PROFILE"

    read -n 1 -s -r -p "Stack Deployed! 🍺🍺 (press any key to exit.)";
    clear;
    
else
    echo "Exiting..."
    clear;
fi





