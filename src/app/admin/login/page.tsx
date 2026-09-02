'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminLoginSchema, AdminLoginFormValues } from '@/lib/validators/inquiry';
import { Compass, Lock, Mail, ShieldAlert, Loader2, KeyRound } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        router.push(redirectPath);
        router.refresh();
      } else {
        setErrorMessage(result.message || 'Invalid administrator credentials');
      }
    } catch (err) {
      setErrorMessage('Authentication error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full p-8 sm:p-10 space-y-6 shadow-xl animate-fadeIn">
      {/* Header Monogram */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-muted mx-auto text-foreground">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-foreground">
            ABC <span className="font-normal text-xs uppercase tracking-widest opacity-80">Portal</span>
          </h1>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mt-0.5">
            Internal Staff Portal
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md flex items-center gap-2 text-xs text-destructive">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Staff Email
          </label>
          <div className="relative">
            <Input
              type="email"
              placeholder="admin@abctravels.com"
              {...register('email')}
              className="pl-9"
            />
            <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Passcode / Password
          </label>
          <div className="relative">
            <Input
              type="password"
              placeholder="••••••••••••"
              {...register('password')}
              className="pl-9"
            />
            <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          </div>
          {errors.password && (
            <p className="text-red-500 text-[11px] mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-xs uppercase tracking-wider font-semibold gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <KeyRound className="w-4 h-4" />
              <span>Access Concierge Portal</span>
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs text-muted-foreground">Loading Authentication...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
