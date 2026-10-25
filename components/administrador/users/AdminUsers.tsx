"use client";

import { addAdminUser } from '@/actions/admin/addAdminUser';
import { getAdminUsers } from '@/actions/admin/getAdminUsers';
import { removeAdminUser } from '@/actions/admin/removeAdminUser';
import Button from '@/components/general-components/Button';
import { AdminUser } from '@/types/admin/AdminUser';
import React from 'react';
import { FiShield, FiTrash2, FiUserPlus } from 'react-icons/fi';

export default function AdminUsers() {
    const [admins, setAdmins] = React.useState<AdminUser[]>([]);
    const [username, setUsername] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState<string | null>(null);

    const loadAdmins = React.useCallback(async () => {
        const users = await getAdminUsers();
        setAdmins(users ?? []);
    }, []);

    React.useEffect(() => {
        loadAdmins();
    }, [loadAdmins]);

    const handleAdd = async () => {
        if (!username.trim()) return;
        setIsLoading(true);
        setMessage(null);
        const result = await addAdminUser(username.trim());
        setIsLoading(false);
        if (result) {
            setUsername('');
            setMessage('Administrador agregado correctamente');
            loadAdmins();
        } else {
            setMessage('Error al agregar el administrador');
        }
    };

    const handleRemove = async (admin: AdminUser) => {
        setIsLoading(true);
        setMessage(null);
        const result = await removeAdminUser(admin.username);
        setIsLoading(false);
        if (result) {
            setMessage('Administrador eliminado');
            loadAdmins();
        } else {
            setMessage('Error al eliminar el administrador');
        }
    };

    return (
        <div className='flex-1 p-4 flex flex-col w-full'>
            <span className='text-xs text-text-secondary'>Usuarios</span>
            <h2 className='font-bold text-text-primary'>Administración de usuarios</h2>
            <p className='text-sm text-text-secondary'>Determina qué usuarios de MyAnimeList son administradores del sitio.</p>

            <div className='mt-6 flex flex-col gap-2 max-w-md'>
                <label htmlFor='admin-username' className='text-sm text-text-secondary'>Username de MyAnimeList</label>
                <div className='flex gap-2'>
                    <input
                        id='admin-username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='ej: graso'
                        className='flex-1 rounded-md border border-border-default bg-bg-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-primary focus-visible:ring-2 focus-visible:ring-accent-primary/50'
                    />
                    <Button
                        variant="primary"
                        onClick={handleAdd}
                        disabled={!username.trim() || isLoading}
                        isLoading={isLoading}
                        leftIcon={<FiUserPlus aria-hidden="true" />}
                    >
                        Agregar
                    </Button>
                </div>
                {message && <p className='text-sm text-text-secondary'>{message}</p>}
            </div>

            <div className='mt-8 w-full max-w-2xl'>
                <h3 className='font-semibold text-sm text-text-secondary mb-3'>Administradores actuales</h3>
                {admins.length === 0 ? (
                    <p className='text-sm text-text-tertiary'>No hay administradores.</p>
                ) : (
                    <div className='flex flex-col gap-2'>
                        {admins.map((admin) => (
                            <div key={admin.username} className='flex items-center justify-between rounded-lg border border-border-default px-4 py-3'>
                                <div className='flex items-center gap-3'>
                                    <FiShield className='w-4 h-4 text-accent-primary' aria-hidden="true" />
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-medium text-text-primary'>{admin.username}</span>
                                        {admin.createdAt && (
                                            <span className='text-xs text-text-tertiary'>
                                                Desde {new Date(admin.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    {admin.root && (
                                        <span className='rounded-full bg-accent-primary-subtle px-2 py-0.5 text-xs font-medium text-accent-primary'>
                                            Root
                                        </span>
                                    )}
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemove(admin)}
                                    disabled={admin.root || isLoading}
                                    leftIcon={<FiTrash2 aria-hidden="true" />}
                                >
                                    Quitar
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
