'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const loadingMessages = [
  "Analyse des besoins de sécurisation...",
  "Évaluation des zones sensibles...",
  "Préparation de la feuille de route personnalisée...",
];

type FieldType = 'text' | 'textarea' | 'select' | 'email' | 'tel';

type StepOption = {
  label: string;
  value: string;
};

type StepFieldConfig<Name extends string = string> = {
  name: Name;
  label: string;
  placeholder?: string;
  helper?: string;
  type?: FieldType;
  required?: boolean;
  options?: readonly StepOption[];
};

type StepConfig<Id extends string = string, Name extends string = string> = {
  id: Id;
  title: string;
  description: string;
  fields: readonly StepFieldConfig<Name>[];
};

const stepDefinitions = [
  {
    id: 'site-profile',
    title: 'Profil du site',
    description:
      "Commençons par comprendre l'environnement dans lequel vos équipements évolueront.",
    fields: [
      {
        name: 'siteName',
        label: 'Nom du site ou de la structure',
        placeholder: 'Ex. Siège Abidjan Plateau',
        required: true,
      },
      {
        name: 'siteType',
        label: 'Type de site',
        type: 'select',
        required: true,
        options: [
          { label: 'Bureaux', value: 'bureaux' },
          { label: 'Site industriel', value: 'industriel' },
          { label: 'Commerce / Retail', value: 'commerce' },
          { label: 'Établissement public', value: 'public' },
          { label: 'Résidentiel', value: 'residentiel' },
          { label: 'Autre', value: 'autre' },
        ],
      },
      {
        name: 'siteSurface',
        label: 'Surface approximative',
        placeholder: 'Ex. 2 500 m² sur 3 niveaux',
        required: true,
      },
      {
        name: 'criticalAreas',
        label: 'Zones sensibles à protéger',
        placeholder: 'Ex. salles serveurs, accueil, laboratoires...',
        type: 'textarea',
      },
    ],
  },
  {
    id: 'operations',
    title: 'Fonctionnement & activités',
    description:
      'Nous analysons votre activité pour calibrer les scénarios de sécurité.',
    fields: [
      {
        name: 'operationHours',
        label: 'Jours et horaires d’activité',
        placeholder: 'Ex. Lundi - Dimanche, 06h00 à 22h00',
        required: true,
      },
      {
        name: 'staffVolume',
        label: 'Nombre approximatif de collaborateurs et visiteurs par jour',
        placeholder: 'Ex. 120 collaborateurs, 40 visiteurs',
      },
      {
        name: 'existingSecurity',
        label: 'Solutions de sécurité déjà en place',
        placeholder: 'Ex. caméra IP, contrôle d’accès par badges, gardiennage... ',
        type: 'textarea',
      },
      {
        name: 'securityIncidents',
        label: 'Incidents récents ou points de vigilance',
        placeholder: 'Ex. intrusions nocturnes, vols, contraintes réglementaires... ',
        type: 'textarea',
      },
    ],
  },
  {
    id: 'expectations',
    title: 'Objectifs & priorités',
    description: 'Précisez vos attentes pour que nous bâtissions la bonne architecture.',
    fields: [
      {
        name: 'primaryGoals',
        label: 'Vos priorités de sécurisation',
        placeholder: 'Ex. supervision temps réel, traçabilité des accès, réduction du gardiennage... ',
        type: 'textarea',
        required: true,
      },
      {
        name: 'desiredTechnologies',
        label: 'Technologies envisagées',
        placeholder: 'Ex. vidéosurveillance IA, contrôle biométrique, détection périmétrique...',
        type: 'textarea',
      },
      {
        name: 'budgetRange',
        label: 'Enveloppe budgétaire estimative',
        placeholder: 'Ex. 8 – 12 M FCFA',
      },
      {
        name: 'deploymentTimeline',
        label: 'Échéance souhaitée pour le déploiement',
        placeholder: 'Ex. mise en service avant fin T2 2025',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Coordonnées',
    description:
      'Dernière étape ! Nous reviendrons rapidement vers vous avec une proposition adaptée.',
    fields: [
      {
        name: 'contactName',
        label: 'Nom & prénom du contact principal',
        placeholder: 'Ex. Awa Koné',
        required: true,
      },
      {
        name: 'contactRole',
        label: 'Fonction occupée',
        placeholder: 'Ex. Responsable infrastructure IT',
      },
      {
        name: 'contactEmail',
        label: 'Email professionnel',
        type: 'email',
        placeholder: 'Ex. awa.kone@entreprise.ci',
        required: true,
      },
      {
        name: 'contactPhone',
        label: 'Numéro de téléphone',
        type: 'tel',
        placeholder: 'Ex. +225 07 00 00 00',
        required: true,
      },
      {
        name: 'additionalNotes',
        label: 'Informations complémentaires',
        type: 'textarea',
        placeholder: 'Précisions logistiques, contraintes d’accès, souhaits de démonstration...',
      },
    ],
  },
] as const satisfies readonly StepConfig[];

type StepDefinition = (typeof stepDefinitions)[number];
type StepField = StepDefinition['fields'][number]['name'];
type StepValues = Record<StepField, string>;
type FieldErrorState = Record<StepField, string | null>;

type SubmitStatus = 'idle' | 'success';

const createInitialValues = (): StepValues => {
  return stepDefinitions.reduce((acc, step) => {
    step.fields.forEach((field) => {
      acc[field.name] = '';
    });
    return acc;
  }, {} as StepValues);
};

const createInitialFieldErrors = (): FieldErrorState => {
  return stepDefinitions.reduce((acc, step) => {
    step.fields.forEach((field) => {
      acc[field.name] = null;
    });
    return acc;
  }, {} as FieldErrorState);
};

const isEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
const isPhone = (value: string) => /\d{7,}/.test(value.replace(/\D/g, ''));

export default function BuildingSecurityQuestionnaire() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [values, setValues] = useState<StepValues>(() => createInitialValues());
  const [fieldErrors, setFieldErrors] = useState<FieldErrorState>(() => createInitialFieldErrors());
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const loadingInterval = useRef<NodeJS.Timeout | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const progress = useMemo(() => {
    if (stepDefinitions.length <= 1) {
      return 100;
    }
    return (currentStepIndex / (stepDefinitions.length - 1)) * 100;
  }, [currentStepIndex]);

  useEffect(() => {
    if (!isSending) {
      if (loadingInterval.current) {
        clearInterval(loadingInterval.current);
      }
      return;
    }

    loadingInterval.current = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2200);

    return () => {
      if (loadingInterval.current) {
        clearInterval(loadingInterval.current);
      }
    };
  }, [isSending]);

  const resetForm = () => {
    setValues(createInitialValues());
    setFieldErrors(createInitialFieldErrors());
    setCurrentStepIndex(0);
  };

  const handleFieldChange = (field: StepField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: null }));
    if (status === 'success') {
      setStatus('idle');
    }
  };

  const validateField = (field: StepFieldConfig<StepField>, value: string) => {
    if (field.required && !value.trim()) {
      return 'Ce champ est requis.';
    }

    if (field.type === 'email' && value && !isEmail(value)) {
      return 'Adresse email invalide.';
    }

    if (field.type === 'tel' && value && !isPhone(value)) {
      return 'Numéro de téléphone invalide.';
    }

    return null;
  };

  const validateStep = (step: StepDefinition) => {
    let hasErrors = false;
    const nextErrors: FieldErrorState = { ...fieldErrors };

    step.fields.forEach((field) => {
      const error = validateField(field, values[field.name]);
      nextErrors[field.name] = error;
      if (error) {
        hasErrors = true;
      }
    });

    setFieldErrors(nextErrors);
    return !hasErrors;
  };

  const goToNextStep = () => {
    const step = stepDefinitions[currentStepIndex];
    if (!validateStep(step)) {
      return;
    }
    setCurrentStepIndex((prev) => Math.min(prev + 1, stepDefinitions.length - 1));
  };

  const goToPreviousStep = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const step = stepDefinitions[currentStepIndex];
    if (!validateStep(step)) {
      return;
    }

    setIsSending(true);
    setSubmitError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1600));
      setStatus('success');
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la soumission du questionnaire', error);
      setSubmitError(
        'Une erreur est survenue lors de la soumission. Merci de réessayer dans quelques instants.',
      );
    } finally {
      setIsSending(false);
    }
  };

  const currentStep = stepDefinitions[currentStepIndex];

  const overview = useMemo(() => {
    return stepDefinitions.map((step) => ({
      id: step.id,
      title: step.title,
      fields: step.fields.map((field) => ({
        label: field.label,
        value: values[field.name],
      })),
    }));
  }, [values]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-64 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500 blur-3xl" />
        <div className="absolute -bottom-48 left-10 h-80 w-80 rounded-full bg-gradient-to-tr from-slate-500 via-sky-500 to-emerald-400 blur-3xl" />
        <div className="absolute bottom-32 right-6 h-72 w-72 rounded-full bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-400 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 backdrop-blur">
                Audit sécurité bâtiment
              </span>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Concevez votre dispositif de sûreté sur-mesure
              </h1>
              <p className="max-w-2xl text-lg text-slate-200">
                Répondez à quelques questions essentielles pour que nos experts définissent une architecture de sécurité cohérente avec vos enjeux opérationnels.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>
                  Étape {currentStepIndex + 1} sur {stepDefinitions.length}
                </span>
                <span>{currentStep.title}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-white">{currentStep.title}</h2>
                    <p className="text-sm text-slate-200/80">{currentStep.description}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6">
                    {currentStep.fields.map((field) => {
                      const error = fieldErrors[field.name];
                      const value = values[field.name] ?? '';

                      return (
                        <div key={field.name} className="space-y-2">
                          <label htmlFor={field.name} className="block text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
                            {field.label}
                          </label>
                          <div>
                            {field.type === 'textarea' ? (
                              <textarea
                                id={field.name}
                                name={field.name}
                                value={value}
                                onChange={(event) => handleFieldChange(field.name, event.target.value)}
                                placeholder={field.placeholder}
                                rows={4}
                                className={`w-full rounded-2xl border bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${
                                  error ? 'border-rose-400/70' : 'border-white/10'
                                }`}
                              />
                            ) : field.type === 'select' ? (
                              <select
                                id={field.name}
                                name={field.name}
                                value={value}
                                onChange={(event) => handleFieldChange(field.name, event.target.value)}
                                className={`w-full rounded-2xl border bg-slate-950/70 px-4 py-3 text-sm text-white transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${
                                  error ? 'border-rose-400/70' : 'border-white/10'
                                }`}
                              >
                                <option value="">Sélectionnez une option</option>
                                {(field.options ?? []).map((option) => (
                                  <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                id={field.name}
                                name={field.name}
                                type={field.type ?? 'text'}
                                value={value}
                                onChange={(event) => handleFieldChange(field.name, event.target.value)}
                                placeholder={field.placeholder}
                                className={`w-full rounded-2xl border bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${
                                  error ? 'border-rose-400/70' : 'border-white/10'
                                }`}
                              />
                            )}
                          </div>
                          {field.helper && (
                            <p className="text-xs text-slate-300/80">{field.helper}</p>
                          )}
                          {error && (
                            <p className="text-xs font-medium text-rose-300">{error}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      disabled={currentStepIndex === 0 || isSending}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30"
                    >
                      ← Retour
                    </button>

                    {currentStepIndex < stepDefinitions.length - 1 ? (
                      <button
                        type="button"
                        onClick={goToNextStep}
                        disabled={isSending}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Continuer →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSending ? 'Envoi...' : 'Valider mon audit'}
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </form>

            <AnimatePresence>
              {status === 'success' && !isSending && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-6 text-sm text-emerald-100 shadow-xl backdrop-blur"
                >
                  <h3 className="text-lg font-semibold text-emerald-100">
                    Merci, votre demande a bien été transmise !
                  </h3>
                  <p className="mt-2 text-emerald-50/80">
                    Nos experts sécurité vous contacteront très rapidement avec une proposition détaillée et des scénarios adaptés à vos contraintes opérationnelles.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {submitError && (
              <div className="rounded-3xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-100">
                {submitError}
              </div>
            )}
          </div>

          <aside className="w-full max-w-lg space-y-6 lg:w-96">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-lg font-semibold text-white">Ce que vous obtenez</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-200/80">
                <li>• Cartographie précise des zones de sûreté prioritaires</li>
                <li>• Scénarios technologiques adaptés à vos flux et contraintes</li>
                <li>• Projection budgétaire et planning de déploiement</li>
                <li>• Accompagnement d&apos;experts Label Retail jusqu&apos;à la mise en service</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-lg font-semibold text-white">Résumé en temps réel</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-200/80">
                {overview.map((step) => (
                  <div key={step.id}>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                      {step.title}
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {step.fields.map((field) => (
                        <li key={field.label} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                          <div>
                            <p className="text-xs font-semibold text-white/90">{field.label}</p>
                            <p className="text-xs text-slate-300/80">
                              {field.value ? field.value : '—'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {isSending && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-200 shadow-2xl backdrop-blur"
                >
                  <p className="font-semibold text-white">Analyse en cours...</p>
                  <p className="mt-2 text-slate-300/80">
                    {loadingMessages[loadingMessageIndex]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>
      </section>
    </div>
  );
}
