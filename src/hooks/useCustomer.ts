import { useState, useEffect } from 'react';
import { Customer } from '@/types';

const CUSTOMER_STORAGE_KEY = 'american-burguer-customer';

export const useCustomer = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  // Carregar dados do cliente do localStorage
  useEffect(() => {
    const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch (error) {
        console.error('Erro ao carregar dados do cliente:', error);
      }
    }
  }, []);

  // Salvar dados do cliente no localStorage
  useEffect(() => {
    if (customer) {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
    }
  }, [customer]);

  const updateCustomer = (data: Customer) => {
    setCustomer(data);
  };

  const clearCustomer = () => {
    setCustomer(null);
    localStorage.removeItem(CUSTOMER_STORAGE_KEY);
  };

  return {
    customer,
    updateCustomer,
    clearCustomer
  };
};