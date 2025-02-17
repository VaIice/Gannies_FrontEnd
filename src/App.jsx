import GlobalStyles from '@/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { router } from '@/routes/router';
import { useEffect } from 'react';
import { getSessionStatus } from '@/api/authApi';
import { useSocket } from '@/hooks/useSocket';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/store/auth';
import { initialModalState } from '@/store/modalState';
import useSelectorList from '@/hooks/useSelectorList';

function App() {
  const dispatch = useDispatch();
  const { connectSocket, handleSessionExpiryWarning } = useSocket();
  const { isLogin } = useSelectorList();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (isLogin) {
          const sessionStatus = await getSessionStatus();
          const remainingTime = parseInt(
            sessionStatus.data.remainingTime.split(' ')[0]
          );
          console.log(remainingTime);
          console.log(sessionStatus.data);
          if (sessionStatus.data?.expires) {
            dispatch(setLogout());
            dispatch(initialModalState());
            return;
          } else if (remainingTime < 30) {
            console.log(remainingTime);
          }
          const newSocket = await connectSocket(3);
          newSocket.on('sessionExpiryWarning', handleSessionExpiryWarning);
          newSocket.on('notification', (message) => {
            console.log('서버로부터 받은 알림:', message);
          });
          return () => {
            newSocket.disconnect();
          };
        }
      } catch (error) {
        dispatch(setLogout());
        dispatch(initialModalState());
        alert('접속이 만료되었습니다. 다시 로그인해주세요.');
      }
    };

    initializeApp();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
