import { Route, Routes } from 'react-router-dom';
import Test from '../test/Test';

export default function Router() {

    return (
        <Routes>
            <Route path='/test' element={<Test/>} />
            <Route path='/' element={<Test/>} />
        </Routes>
    )
}