import {
    CssReset,
    CssVariables,
    LoginForm,
    PasswordResetRequestForm,
    PasswordUpdateForm,
    CompleteRegistrationForm,
    ConfirmEmailForm,
} from '@dhis2/ui'
import React from 'react'
import { HashRouter, Link, Navigate, Routes, Route } from 'react-router-dom'
import classes from './App.module.css'
import { CreateAccountCustom } from './components/CreateAccountCustom.js'
import { HelpPage } from './components/HelpPage.js'
import { Sidebar } from './components/Sidebar.js'

const ExpandedLoginForm = () => (
    <>
        <LoginForm />
        <div className={classes.expandedLoginLink}>
            <Link to="/help-page" className={classes.linkText}>
                Get help
            </Link>
        </div>
    </>
)

const LoginRoutes = () => (
    <Routes>
        <Route path="/" element={<ExpandedLoginForm />} />
        <Route path="/create-account" element={<CreateAccountCustom />} />
        <Route
            path="/complete-registration"
            element={<CompleteRegistrationForm />}
        />
        <Route path="/reset-password" element={<PasswordResetRequestForm />} />
        <Route path="/update-password" element={<PasswordUpdateForm />} />
        <Route path="/confirm-email" element={<ConfirmEmailForm />} />
        <Route path="/help-page" element={<HelpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
)

const App = () => (
    <>
        <CssReset />
        <CssVariables colors spacers theme elevations />
        <div className={classes.container}>
            <Sidebar />
            <div className={classes.routeContainer}>
                <HashRouter>
                    <LoginRoutes />
                </HashRouter>
            </div>
        </div>
    </>
)

export default App
