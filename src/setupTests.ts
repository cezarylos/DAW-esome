import { configure } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as JFM from 'jest-fetch-mock';

configure({ adapter: new ReactSixteenAdapter() });
JFM.enableFetchMocks();
