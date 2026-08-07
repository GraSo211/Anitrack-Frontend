"use client";

import React, { useState } from 'react'
import Hero from './hero/AdminHero'
import AdminUsers from './users/AdminUsers'
import { ADMINSELECTOR } from '@/types/admin/AdminSelector';



interface Props {
    selector: ADMINSELECTOR
}

export default function ConfigSelector({ selector }: Props) {

    return (
        <div className='w-full'>
            {
                selector == "dashboard" && <div>a</div>

            }
            {
                selector == "hero" && <Hero></Hero>

            }
            {
                selector == "users" && <AdminUsers></AdminUsers>

            }
            {
                selector == "configuration" && <div>a</div>

            }

        </div>
    )
}
