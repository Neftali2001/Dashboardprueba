'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useState } from 'react';

export default function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar datos a tu backend
    console.log('Signup:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-gray-50 p-6 space-y-6 shadow">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Crear cuenta</h1>
        <p className="text-sm text-gray-500">Regístrate para comenzar</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirmar Contraseña</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
        Registrarse
      </Button>

      <div className="flex items-center justify-between">
        <hr className="w-full border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">o</span>
        <hr className="w-full border-gray-300" />
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <FaGoogle className="text-red-500" />
          Registrarse con Google
        </Button>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <FaFacebook className="text-blue-600" />
          Registrarse con Facebook
        </Button>
      </div>

      <p className="text-sm text-center text-gray-500">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="text-emerald-700 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
