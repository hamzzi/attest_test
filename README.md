# GitHub Actions attest-build-provenance Test Project

This project is a sample project for testing the `attest-build-provenance` action in GitHub Actions. It demonstrates how to prove the provenance of build artifacts.

## Project Structure

```
.
├── package.json              # Node.js project configuration
├── index.js                  # Main application code
├── .github/
│   └── workflows/
│       └── attest-build.yml  # GitHub Actions workflow
└── README.md                 # This file
```

## Key Features

### 1. Build Attestation
- Cryptographically prove the origin of artifacts generated during the build process
- Comply with SLSA (Supply-chain Levels for Software Artifacts) Provenance standards
- Use Sigstore for signing and transparency log entries

### 2. Multi-Artifact Support
- Support attestation for multiple artifacts in a single workflow
- Generate separate attestation information for each artifact


## Setup Instructions

### 1. Repository Permissions

The following permissions are required to use attest-build-provenance in GitHub Actions:

```yaml
permissions:
  contents: read
  id-token: write
  attestations: write
```

### 2. Workflow Triggers

This project runs workflows in the following cases:
- Push to `main` or `develop` branches
- Pull requests to `main` branch
- Manual workflow execution (workflow_dispatch)

## Usage

### 1. Local Testing

```bash
# Install dependencies
npm install

# Run the application
npm start

# Run tests
npm test

# Run build
npm run build
```

### 2. GitHub Actions Execution

1. Push this code to a GitHub repository
2. Check workflow execution in the GitHub Actions tab
3. Monitor the build and attestation process

### 3. Attestation Verification

After workflow execution, generated attestations can be verified using the GitHub UI or by checking the attestation summary in the workflow logs. The attestations are stored as part of the workflow run and can be accessed through the GitHub attestations API.

## Workflow Description

### Job 1: build-and-attest
A basic example that generates attestation for a single artifact.

1. **Build Process**: Node.js application build
2. **Artifact Generation**: Create `artifact.tar.gz` file
3. **Attestation Generation**: Use `actions/attest-build-provenance` action for attestation
4. **Verification**: Output and verify attestation information

### Job 2: build-and-attest-with-subjects
An advanced example that generates attestation for multiple artifacts.

1. **Multiple Artifact Generation**: Application and configuration file artifacts
2. **Multi-Subject Attestation**: Use `subjects` parameter for attesting multiple artifacts
3. **Summary**: Output summary of generated attestation information

## Security Considerations

### 1. OIDC Tokens
- Identity verification using GitHub Actions OIDC tokens
- Requires `id-token: write` permission

### 2. Signing Keys
- Temporary certificate issuance using Sigstore's Fulcio
- Log signatures to Rekor transparency log

### 3. Attestation Verification
- Validate attestation certificate authenticity
- Verify build information integrity

## Troubleshooting

### Common Issues

1. **Permission Errors**
   ```
   Error: Resource not accessible by integration
   ```
   - Check Actions permissions in repository settings
   - Verify `id-token: write` permission is granted

2. **Attestation Failures**
   ```
   Error: failed to attest build provenance
   ```
   - Verify artifact path is correct
   - Ensure digest algorithm matches

3. **Signing Errors**
   ```
   Error: failed to sign attestation
   ```
   - Check OIDC token issuance
   - Verify Sigstore service status

### Debugging Tips

1. **Enable Detailed Logging**
   ```yaml
   - name: Attest build provenance
     uses: actions/attest-build-provenance@v1
     with:
       subject-path: 'artifact.tar.gz'
     env:
       ACTIONS_STEP_DEBUG: true
   ```

2. **Verify Artifacts**
   ```bash
   # Check artifact digest
   sha256sum artifact.tar.gz
   
   # Check artifact contents
   tar -tzf artifact.tar.gz
   ```

## References

- [GitHub Actions attest-build-provenance Documentation](https://docs.github.com/en/actions/security-for-github-actions/using-the-attest-build-provenance-action)
- [SLSA Provenance Specification](https://slsa.dev/provenance/v1)
- [Sigstore Project](https://www.sigstore.dev/)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

## License

MIT License
