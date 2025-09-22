/**
 * Simple test application for GitHub Actions attest-build-provenance
 * This application demonstrates basic functionality that can be built and attested
 */

class AttestTestApp {
    constructor() {
        this.name = "Attest Test Application";
        this.version = "1.0.0";
        this.buildTime = new Date().toISOString();
    }

    greet() {
        console.log(`Hello from ${this.name}!`);
        console.log(`Version: ${this.version}`);
        console.log(`Build Time: ${this.buildTime}`);
        console.log("This application is used to test GitHub Actions attest-build-provenance.");
    }

    getInfo() {
        return {
            name: this.name,
            version: this.version,
            buildTime: this.buildTime,
            description: "Test application for build provenance attestation"
        };
    }
}

// Run the application if this file is executed directly
if (require.main === module) {
    const app = new AttestTestApp();
    app.greet();
    
    // Also output as JSON for potential CI/CD usage
    console.log("\nApplication Info (JSON):");
    console.log(JSON.stringify(app.getInfo(), null, 2));
}

module.exports = AttestTestApp;
