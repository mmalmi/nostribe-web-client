'use client';

import { useRouter } from 'next/navigation';
import { generatePrivateKey } from 'nostr-tools';
import { useCallback, useEffect, useState } from 'react';

import { CardContainer, Spinner } from '@/components';

import useStore from '@/store';

import { usePublish } from '@/hooks';
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const { data } = useStore((state) => state.auth.user);
  const { loginWithPrivateKey } = useStore(
    (state) => state.auth
  );
  const publish = usePublish();

  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (data) {
      router.replace('/');
    }
  }, [data, router]);

  const handleDisplayNameInput = useCallback((event: any) => {
    setDisplayName(event.target.value);
  }, []);

  const handleSignupButton = useCallback(() => {
    const privateKey = generatePrivateKey();
    loginWithPrivateKey(privateKey);
    // TODO publish profile event
  }, []);

  return (
    <>
      <CardContainer>
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold md:text-4xl">iris</h1>
          <h2 className="text-xs">Connecting People</h2>
        </div>
      </CardContainer>

      <CardContainer>
        <div className="form-control w-full">
          <input
            autoFocus={true}
            type="text"
            placeholder="What's your name?"
            className="input-bordered input-primary input w-full rounded-full"
            value={displayName}
            onChange={handleDisplayNameInput}
          />
        </div>
        <button
          className="btn-primary btn rounded-full capitalize"
          onClick={handleSignupButton}
        >
          Go
        </button>
      </CardContainer>

      <CardContainer>
        <p className="text-sm">Already have an account?</p>
        <p>
          <Link href="/login" className="btn btn-sm rounded-full capitalize">Log in</Link>
        </p>
      </CardContainer>
    </>
  );
};

export default Login;
