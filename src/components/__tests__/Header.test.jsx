import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';


const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
};

describe('Header', () => {
    test('renders without crashing', () => {
        renderWithRouter(
            <Header />  
        );
    });
});

