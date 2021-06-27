import fire from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyB4MdMzbwAgWRptdVsPX7c2OW0FTS9OQrs",
    authDomain: "firenext-test-34ddf.firebaseapp.com",
    projectId: "firenext-test-34ddf",
    storageBucket: "firenext-test-34ddf.appspot.com",
    messagingSenderId: "498724858814",
    appId: "1:498724858814:web:8be6463416dcb7c8caa7ef"
}

class Firebase {
    constructor() {
        if (!fire.apps.length) {
            fire.initializeApp(config);
        }
        this.auth = fire.auth()
    }

    async login({ email, password }) {
        return await this.auth.signInWithEmailAndPassword(email, password)
    }

    async logout() {
        return await this.auth.signOut()
    }

    async register({ name, email, password }) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        await this.auth.currentUser.sendEmailVerification()
        return this.auth.currentUser.updateProfile({
            displayName: name,

        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    isLoggedIN() {
        if (this.auth.currentUser) {
            return true
        } else {
            return false
        }
    }

    async deleteAccount() {
        if (this.auth.currentUser) {
            await this.auth.currentUser.delete()
            return true
        } else {
            return false
        }
    }

    getProfile() {
        if (this.auth.currentUser) {
            return {
                name: this.auth.currentUser.displayName,
                email: this.auth.currentUser.email,
                verified: this.auth.currentUser.emailVerified
            }
        } else {
            return {
                name: null,
                email: null
            }
        }
    }
    async sendVerification() {
        try {
            if (this.auth.currentUser) {
                await this.auth.currentUser.sendEmailVerification()
                return true
            } else {
                throw ''
            }
        } catch (error) {
            return false
        }
    }
}

export default new Firebase()
