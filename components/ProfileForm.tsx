'use client';

import { useRef, useState } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/dashboard';
import { cn } from '@/lib/utils';

const OPTIONS = {
  voice: [['male', 'Male'], ['female', 'Female']],
  style: [['casual', 'Casual'], ['formal', 'Formal']],
} as const;

export default function ProfileForm() {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<null | {
    firstName: string; lastName: string; interest: string; voice: string; style: string;
  }>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [uploading, setUploading] = useState(false);

  if (!isLoaded || !user) {
    return <div className="h-64 rounded-2xl bg-stone-200/60 animate-pulse" />;
  }

  // Seed once from Clerk so typing isn't overwritten by user refreshes
  const values = form ?? {
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    interest: (user.unsafeMetadata.interest as string) ?? '',
    voice: (user.unsafeMetadata.voice as string) ?? 'male',
    style: (user.unsafeMetadata.style as string) ?? 'casual',
  };
  const set = (patch: Partial<typeof values>) => {
    setForm({ ...values, ...patch });
    setStatus('idle');
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    try {
      await user.update({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        unsafeMetadata: {
          ...user.unsafeMetadata,
          interest: values.interest.trim(),
          voice: values.voice,
          style: values.style,
        },
      });
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  };

  const upload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      await user.setProfileImage({ file });
    } finally {
      setUploading(false);
    }
  };

  const initials = (values.firstName[0] ?? '') + (values.lastName[0] ?? '');

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      <Card className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-zinc-900">Your details</h2>

        <div className="flex items-center gap-5">
          {user.hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt="" className="size-20 rounded-full object-cover" />
          ) : (
            <span className="grid size-20 place-items-center rounded-full bg-stone-100 text-xl font-bold text-zinc-600 uppercase">
              {initials || '?'}
            </span>
          )}
          <div className="flex flex-col gap-1">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => upload(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-fit rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-stone-50 disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Change photo'}
            </button>
            <span className="text-xs text-zinc-500">JPG, PNG or GIF</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700">
            First name
            <input className="input" value={values.firstName} onChange={(e) => set({ firstName: e.target.value })} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700">
            Last name
            <input className="input" value={values.lastName} onChange={(e) => set({ lastName: e.target.value })} />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700">
          Email
          <input
            className="input bg-stone-50 text-zinc-500"
            value={user.primaryEmailAddress?.emailAddress ?? ''}
            readOnly
          />
          <button
            type="button"
            onClick={() => openUserProfile()}
            className="w-fit text-sm font-semibold text-primary hover:underline"
          >
            Change email or password
          </button>
        </label>
      </Card>

      <Card className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold text-zinc-900">Learning preferences</h2>
          <p className="text-sm text-zinc-600">
            New paths use these, and your tutor speaks the way you pick here.
          </p>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700">
          Interests
          <input
            className="input"
            value={values.interest}
            onChange={(e) => set({ interest: e.target.value })}
            placeholder="e.g. Formula 1, cooking, football"
          />
          <span className="text-xs font-normal text-zinc-500">
            Lessons explain new ideas through analogies from these.
          </span>
        </label>

        {(['voice', 'style'] as const).map((key) => (
          <fieldset key={key} className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-zinc-700 mb-2">
              Tutor {key}
            </legend>
            <div className="flex gap-2">
              {OPTIONS[key].map(([val, label]) => (
                <label
                  key={val}
                  className={cn(
                    'cursor-pointer rounded-xl border px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40',
                    values[key] === val
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-stone-300 text-zinc-700 hover:bg-stone-50',
                  )}
                >
                  <input
                    type="radio"
                    name={key}
                    value={val}
                    checked={values[key] === val}
                    onChange={() => set({ [key]: val })}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </Card>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === 'saving'} className="btn-primary">
          {status === 'saving' && <Loader2 className="size-4 animate-spin mr-2" aria-hidden />}
          Save changes
        </button>
        <span role="status" className={cn('text-sm', status === 'error' ? 'text-red-600' : 'text-zinc-600')}>
          {status === 'saved' && 'Saved.'}
          {status === 'error' && 'Could not save. Try again.'}
        </span>
      </div>
    </form>
  );
}
