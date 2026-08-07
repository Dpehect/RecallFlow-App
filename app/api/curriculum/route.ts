import { NextResponse } from 'next/server';
import { RECALLFLOW_ENTERPRISE_DATA } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('language') || 'german';
  const level = searchParams.get('level');

  let modules = RECALLFLOW_ENTERPRISE_DATA.modules.filter(m => m.language === lang);

  if (level && level !== 'ALL') {
    modules = modules.filter(m => m.level === level);
  }

  return NextResponse.json({
    status: 'success',
    totalModules: modules.length,
    data: modules
  });
}
