import { Outlet, Navigate } from 'react-router-dom';
import useUserState from '@/hooks/useUserState';
import useSelectorList from '@/hooks/useSelectorList';
import { statusToNumber } from '@/utils/statusToNumber';
import { useDispatch } from 'react-redux';
import { handleModal } from '@/store/modalState';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ minStatus }) => {
  const dispatch = useDispatch();
  const { isSuspended, rejected, membershipStatus } = useSelectorList();
  const numMinStatus = statusToNumber(minStatus);
  const numStatus = statusToNumber(membershipStatus);

  const { checkState } = useUserState();
  const [navigatePath, setNavigatePath] = useState(null);

  useEffect(() => {
    const checkUserState = async () => {
      if (rejected) {
        dispatch(handleModal({ field: 'rejected', value: rejected }));
        setNavigatePath('/');
        return;
      } else if (isSuspended) {
        dispatch(handleModal({ field: 'rejected', value: isSuspended }));
        setNavigatePath('/');
        return;
      }

      if (numStatus < numMinStatus) {
        if (numStatus === 1) {
          setNavigatePath('/sign-up/success');
        } else if (numStatus === 2) {
          dispatch(handleModal({ field: 'isApproval', value: true }));
          setNavigatePath('/');
        } else {
          setNavigatePath('/sign-in');
        }
        return;
      }

      const {
        isSuspended: resSuspended,
        rejected: resRejected,
        membershipStatus: resMembershipStatus,
      } = await checkState();

      if (resRejected) {
        dispatch(handleModal({ field: 'rejected', value: resRejected }));
        setNavigatePath('/');
      } else if (resSuspended) {
        alert('정지');
        setNavigatePath('/');
      } else {
        const numResStatus = statusToNumber(resMembershipStatus);
        if (numResStatus >= numMinStatus) {
          setNavigatePath(null);
        } else if (numResStatus === 1) {
          setNavigatePath('/sign-up/success');
        } else if (numResStatus === 2) {
          dispatch(handleModal({ field: 'isApproval', value: true }));
          setNavigatePath('/');
        } else {
          setNavigatePath('/sign-in');
        }
      }
    };

    checkUserState();
  }, []);

  if (navigatePath) {
    return <Navigate to={navigatePath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
