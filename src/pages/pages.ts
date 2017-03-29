import { ActionsPage } from './actions/actions';
import { HomePage } from './home/home';
import { LessonsPage } from './lessons/lessons';
import { LibraryPage } from './library/library';
import { MissionariesPage } from './missionaries/missionaries';
import { RewardsPage } from './rewards/rewards';
import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './tutorial/tutorial';
import { UsersPage } from './users/users';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;
