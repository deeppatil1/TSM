<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = 'Admin';
    case CLIENT = 'Client';
    case EMPLOYEE = 'Employee';
    
}